# AskNITI

> An intelligent, full-stack RAG (Retrieval-Augmented Generation) search and chat platform designed for fast, accurate knowledge retrieval.

## Overview
**AskNITI** is a production-oriented system that bridges a modern Next.js frontend with a robust Python/FastAPI backend. It utilizes vector embeddings and a local FAISS index to process data, match queries, and serve precise context-aware answers through a clean chat interface.

## Tech Stack
* **Frontend:** Next.js (App Router), React, Tailwind CSS, custom UI component architecture
* **Backend:** Python, FastAPI, FAISS (Vector Index), LangChain / custom data processing scripts
* **Data Layer:** Vector database storage (`index.faiss`, `index.pkl`), automated data preprocessing pipelines

## Repository Structure
```text
AskNITI/
├── backend/                  # Python FastAPI application & RAG pipeline
│   ├── faiss_index/          # Vector storage (index.faiss, index.pkl)
│   ├── diagnose_rag.py       # Debugging and diagnostic utilities for retrieval
│   ├── main.py               # FastAPI server entry point
│   ├── process_data.py       # Data ingestion and chunking script
│   └── requirements.txt      # Python dependencies
└── frontend/                 # Next.js App Router client
    ├── app/                  # Chat and library routes/pages
    ├── components/           # Modular UI (chat-header, input, message-bubble, modals)
    ├── hooks/                # Custom React hooks
    └── lib/                  # Utility functions and API integrations
