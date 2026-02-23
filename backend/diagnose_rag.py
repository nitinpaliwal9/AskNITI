import os
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

def run_diagnostic(query):
    print(f"\n🔍 DIAGNOSING QUERY: '{query}'")
    
    # 1. Setup Embeddings
    model_name = "BAAI/bge-small-en-v1.5"
    embeddings = HuggingFaceEmbeddings(model_name=model_name)

    # 2. Load the Index
    if not os.path.exists("./faiss_index"):
        print("❌ ERROR: 'faiss_index' folder not found. Did you run process_data.py?")
        return

    vector_store = FAISS.load_local(
        "./faiss_index", 
        embeddings, 
        allow_dangerous_deserialization=True
    )

    # 3. Test Retrieval
    print("📡 Step 1: Searching Vector Database...")
    docs = vector_store.similarity_search(query, k=4)
    
    if not docs:
        print("❌ RESULT: The Retriever found ZERO documents. This is why the AI is hallucinating/guessing.")
    else:
        print(f"✅ RESULT: Found {len(docs)} relevant chunks.")
        for i, doc in enumerate(docs):
            print(f"\n--- Chunk {i+1} ---")
            print(f"Source: {doc.metadata.get('source', 'Unknown')}")
            print(f"Content: {doc.page_content[:200]}...") # First 200 chars

if __name__ == "__main__":
    user_test = input("Enter a question to test (e.g., 'PMJJBY premium'): ")
    run_diagnostic(user_test)