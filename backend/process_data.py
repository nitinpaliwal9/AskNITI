import os
import shutil
import time
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

def ingest_government_docs():
    # 1. Configuration
    DATA_PATH = "./data"
    PROCESSED_PATH = "./data/processed"
    INDEX_PATH = "./faiss_index"
    
    # BGE-Small is optimized for "Query-to-Document" matching.
    model_name = "BAAI/bge-small-en-v1.5"
    encode_kwargs = {'normalize_embeddings': True} 
    
    embeddings = HuggingFaceEmbeddings(
        model_name=model_name,
        encode_kwargs=encode_kwargs
    )

    # 2. Ensure directories exist
    if not os.path.exists(DATA_PATH):
        os.makedirs(DATA_PATH)
    if not os.path.exists(PROCESSED_PATH):
        os.makedirs(PROCESSED_PATH)

    # 3. Identify NEW PDFs only
    all_files = [f for f in os.listdir(DATA_PATH) if f.endswith('.pdf')]
    
    if not all_files:
        print("⚠️ No PDFs found in /data. Move files from /processed back to /data if you want to rebuild.")
        return

    # 4. EXORCISM: Force Delete Old Index (Kill the JanMarg ghost)
    if os.path.exists(INDEX_PATH):
        print("🗑️  Cleaning old index to prevent data pollution...")
        try:
            shutil.rmtree(INDEX_PATH)
            time.sleep(1) # Small delay for OS file handles
        except Exception as e:
            print(f"⚠️ Warning: Could not delete old index (it might be in use): {e}")

    print(f"📂 Found {len(all_files)} documents. Building fresh Brain...")

    # 5. Load and Split Documents
    new_chunks = []
    for file in all_files:
        file_path = os.path.join(DATA_PATH, file)
        try:
            loader = PyPDFLoader(file_path)
            pages = loader.load()
            
            text_splitter = RecursiveCharacterTextSplitter(
                chunk_size=1000,
                chunk_overlap=200,
                add_start_index=True,
            )
            file_chunks = text_splitter.split_documents(pages)
            
            # Clean text to improve 'Ration Card' retrieval
            for chunk in file_chunks:
                chunk.page_content = chunk.page_content.replace('\n', ' ').strip()
                
            new_chunks.extend(file_chunks)
            print(f"✅ Processed: {file} ({len(pages)} pages)")
        except Exception as e:
            print(f"❌ Error processing {file}: {e}")

    if not new_chunks:
        print("❌ No valid text extracted. Brain update aborted.")
        return

    # 6. Create the Vector Store from scratch
    print(f"🧠 Indexing {len(new_chunks)} chunks into FAISS...")
    vector_store = FAISS.from_documents(new_chunks, embeddings)

    # 7. Save the updated index
    vector_store.save_local(INDEX_PATH)
    
    # 8. Move files to 'processed' folder
    for file in all_files:
        src = os.path.join(DATA_PATH, file)
        dest = os.path.join(PROCESSED_PATH, file)
        # Handle cases where file already exists in processed
        if os.path.exists(dest):
            os.remove(dest)
        shutil.move(src, dest)

    print(f"\n💾 Success! AskNITI's brain is now CLEAN and REBUILT.")
    print(f"📍 Location: {INDEX_PATH}")
    print(f"🚚 Documents archived to: {PROCESSED_PATH}")

if __name__ == "__main__":
    ingest_government_docs()