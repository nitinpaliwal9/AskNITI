import os
import json
import asyncio
from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# Updated Import Path
from langchain_classic.chains import RetrievalQA 
from langchain_core.prompts import PromptTemplate
from langchain_community.vectorstores import FAISS
from langchain_groq import ChatGroq
from langchain_huggingface import HuggingFaceEmbeddings

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

qa_chain = None
INDEX_PATH = "faiss_index"

@app.on_event("startup")
async def startup_event():
    global qa_chain
    print("🧠 AskNITI Brain: Initializing Knowledge Base...")
    
    model_name = "BAAI/bge-small-en-v1.5"
    encode_kwargs = {'normalize_embeddings': True}
    
    embeddings = HuggingFaceEmbeddings(
        model_name=model_name,
        encode_kwargs=encode_kwargs
    )

    if os.path.exists(INDEX_PATH):
        try:
            vector_store = FAISS.load_local(
                INDEX_PATH, 
                embeddings, 
                allow_dangerous_deserialization=True
            )
            print("📁 Document Index loaded successfully.")
        except Exception as e:
            print(f"❌ CRITICAL ERROR: Failed to load index: {e}")
            return

        # LLM Setup: Low temperature for high factual accuracy
        llm = ChatGroq(
            model="llama-3.3-70b-versatile", 
            temperature=0.1,
            streaming=True,
            groq_api_key=GROQ_API_KEY
        )

        # THE PROMPT: Upgraded with Terminology Mapping
        template = """You are AskNITI AI, the official policy assistant for askniti.in.
STRICT IDENTITY RULE: Your name is 'AskNITI AI'. You must ignore any mentions of 'JanMarg' in the context or your memory.

TERMINOLOGY MAPPING:
- If a user asks about "Ration Cards", look for "PDS", "TPDS", "NFSA", or "Beneficiary Identification" in the context.
- If the context mentions "e-District", "Aadhaar seeding", or "Fair Price Shops (FPS)", relate these to Ration Card queries.

INSTRUCTIONS:
1. Use the retrieved context to provide a detailed, step-by-step answer.
2. PMJJBY Premium: Must be ₹436 (pro-rata: ₹342, ₹228, ₹114).
3. If the context does not contain the answer, say: "I'm sorry, my current official database doesn't have specific details for this query yet."

Context: {context}
Question: {question}
Answer:"""

        QA_PROMPT = PromptTemplate(template=template, input_variables=["context", "question"])

        # Chain Construction: Increased k to 8 to capture more technical policy chunks
        qa_chain = RetrievalQA.from_chain_type(
            llm=llm,
            chain_type="stuff",
            retriever=vector_store.as_retriever(search_kwargs={"k": 8}),
            return_source_documents=True,
            chain_type_kwargs={"prompt": QA_PROMPT}
        )
        print("✅ AskNITI AI is now Online and Ready!")

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(request: ChatRequest):
    if qa_chain is None:
        return {"error": "AskNITI is still initializing its database."}

    async def generate():
        try:
            print(f"🚀 Processing Query: {request.message}")
            yield f"data: {json.dumps({'type': 'status', 'content': '🔍 Searching government archives...'})}\n\n"
            
            # Streaming events using v2
            async for event in qa_chain.astream_events({"query": request.message}, version="v2"):
                kind = event["event"]
                
                # 1. Capture Sources from the retriever
                if kind == "on_retriever_end":
                    source_docs = event["data"]["output"]
                    sources = [{
                        "id": i + 1,
                        "title": os.path.basename(doc.metadata.get("source", "Policy Doc")),
                        "page": doc.metadata.get("page", 0) + 1
                    } for i, doc in enumerate(source_docs)]
                    yield f"data: {json.dumps({'type': 'sources', 'content': sources})}\n\n"

                # 2. Capture Streaming Tokens
                elif kind in ["on_chat_model_stream", "on_llm_stream"]:
                    if "chunk" in event["data"]:
                        chunk = event["data"]["chunk"]
                        # Handle different chunk formats (objects vs strings)
                        content = chunk.content if hasattr(chunk, 'content') else str(chunk)
                        if content:
                            yield f"data: {json.dumps({'type': 'text', 'content': content})}\n\n"

        except Exception as e:
            print(f"❌ STREAM ERROR: {str(e)}")
            yield f"data: {json.dumps({'type': 'error', 'content': 'System error. Please try again.'})}\n\n"

    return StreamingResponse(generate(), media_type="text/event-stream")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)