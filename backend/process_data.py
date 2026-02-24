import os
import gc
import shutil
import logging
from concurrent.futures import ThreadPoolExecutor
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# --- CONFIGURATION ---
DATA_PATH = "./data"
PROCESSED_PATH = "./data/processed"
INDEX_PATH = "faiss_index"
LOG_FILE = "ingestion.log"

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s', 
                    handlers=[logging.FileHandler(LOG_FILE), logging.StreamHandler()])

def get_category(filename):
    """Categorizes documents based on 2026 Sovereign pillars."""
    fn = filename.lower()
    mapping = {
        "agriculture": ["kisan", "agri", "farmer", "fertilizer", "crop", "pranam", "fasal", "dhan"],
        "housing": ["awas", "housing", "pmay"],
        "health": ["ayushman", "health", "hospital", "medical", "vay_vandana", "mohfw"],
        "social_security": ["pension", "bima", "suraksha", "atal", "apy", "pmjjb", "pmsby"],
        "employment": ["nrega", "rojgar", "mgnrega", "livelihood", "rozgar", "job_card"],
        "education": ["scholarship", "ugc", "student", "nsp", "school", "education"],
        "women_empowerment": ["mahila", "beti", "lakhpati", "didi", "shakti", "drone_didi"],
        "entrepreneurship": ["mudra", "msme", "vishwakarma", "startup", "pmegp", "entrepreneur"],
        "digital_infra": ["digital", "aadhar", "upi", "dpdp", "bhashini", "it", "ai_stack"],
        "sanitation_water": ["jal", "jeevan", "swachh", "toilet", "water"],
        "energy": ["surya", "solar", "bijli", "energy", "hydrogen", "ujjwala"],
        "food_security": ["ration", "nfsa", "pds", "anna", "garib_kalyan", "food"],
        "financial_inclusion": ["jandhan", "jmdy", "bank", "credit", "budget", "finance"],
        "odisha_state": ["odisha", "kalia", "bsky", "nabin", "ama_bank"]
    }
    for category, keywords in mapping.items():
        if any(k in fn for k in keywords):
            return category
    return "general"

def clean_text(text):
    """Production cleaning: removes excessive whitespace and noise."""
    text = " ".join(text.split())
    return text

def process_single_file(file):
    """Worker function for parallel processing."""
    file_path = os.path.join(DATA_PATH, file)
    category = get_category(file)
    try:
        loader = PyPDFLoader(file_path)
        pages = loader.load()
        
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=800,
            chunk_overlap=150,
            length_function=len,
            add_start_index=True
        )
        
        chunks = text_splitter.split_documents(pages)
        for chunk in chunks:
            chunk.page_content = clean_text(chunk.page_content)
            chunk.metadata.update({
                "category": category,
                "source_file": file,
                "page": chunk.metadata.get("page", 0) + 1,
                "year": "2026"
            })
        logging.info(f"✅ Processed: {file} -> [{category.upper()}]")
        return chunks
    except Exception as e:
        logging.error(f"❌ Error processing {file}: {e}")
        return []

def ingest_government_docs():
    os.makedirs(DATA_PATH, exist_ok=True)
    os.makedirs(PROCESSED_PATH, exist_ok=True)

    embeddings = HuggingFaceEmbeddings(
        model_name="BAAI/bge-small-en-v1.5",
        encode_kwargs={'normalize_embeddings': True}
    )

    all_files = [f for f in os.listdir(DATA_PATH) if f.endswith('.pdf')]
    if not all_files:
        logging.info("ℹ️ No new PDFs to process.")
        return

    # REDUCED BATCH SIZE for stability
    BATCH_SIZE = 3 
    vector_store = None

    for i in range(0, len(all_files), BATCH_SIZE):
        batch_files = all_files[i : i + BATCH_SIZE]
        
        logging.info(f"📦 Processing Batch {i//BATCH_SIZE + 1}...")
        
        for file in batch_files:
            chunks = process_single_file(file) # Process files one by one for maximum stability
            if not chunks: continue

            if vector_store is None:
                if os.path.exists(INDEX_PATH):
                    vector_store = FAISS.load_local(INDEX_PATH, embeddings, allow_dangerous_deserialization=True)
                    vector_store.add_documents(chunks)
                else:
                    vector_store = FAISS.from_documents(chunks, embeddings)
            else:
                logging.info(f"➕ Adding {len(chunks)} chunks from {file}...")
                vector_store.add_documents(chunks)
            
            # Save and Clear Memory immediately
            vector_store.save_local(INDEX_PATH)
            del chunks
            gc.collect() # Force Python to clear RAM

        # Move files to processed
        for file in batch_files:
            shutil.move(os.path.join(DATA_PATH, file), os.path.join(PROCESSED_PATH, file))
            
        logging.info(f"💾 Batch {i//BATCH_SIZE + 1} finalized and saved.")

    logging.info("🚀 Sovereign Brain Rebuilt Successfully!")
    
if __name__ == "__main__":
    ingest_government_docs()