# 🤖 AI-Powered Document Assistant

### *A Backend-First RAG System with Local LLM Inference*

A high-performance, secure backend API built with **Django REST Framework** that combines standard document management with cutting-edge AI capabilities.

Unlike wrappers for paid APIs, this project leverages **Ollama (running Mistral)** for 100% local, privacy-focused, and cost-free AI inference. It features a robust RAG (Retrieval-Augmented Generation) pipeline orchestrated by **LangGraph**, ensuring answers are strictly grounded in your uploaded documents.

---

## 🚀 Key Features

* **🔐 Secure Authentication:** Full JWT implementation (Registration & Login) using `simplejwt`.
* **📂 Document Management:** Complete CRUD operations with user-level data isolation.
* **🧠 Local AI Intelligence:** Zero-cost inference using **Mistral** via Ollama. No API keys, no rate limits.
* **⚡ Context-Aware QA:** AI answers questions based *strictly* on document context using RAG (FAISS + Embeddings).
* **⚙️ Advanced Control Flow:** Uses **LangGraph** to manage AI execution logic and state.
* **📉 Resource Optimized:** Designed to run efficiently on low-RAM systems.

---

## 🏗️ System Architecture

The system follows a clean, layered architecture ensuring separation of concerns between authentication, business logic, and the AI engine.

```mermaid
graph TD
    Client[Client / Postman] -->|JWT Auth| Auth[DRF + SimpleJWT]
    Auth --> API[REST API Layer]
    API --> Logic[Business Logic & Permissions]
    Logic --> LG[LangGraph Execution Flow]
    LG --> LC[LangChain Retrieval]
    LC -->|Context Search| FAISS[(FAISS Vector Store)]
    LC -->|Prompting| Ollama[Local LLM (Mistral)]
    Ollama -->|Response| Client

```

---

## 🛠️ Tech Stack

| Domain | Technology Used |
| --- | --- |
| **Backend Framework** | Python 3.11+, Django, Django REST Framework |
| **Authentication** | JWT (`djangorestframework-simplejwt`) |
| **AI Orchestration** | LangChain, LangGraph |
| **Vector Search** | FAISS (Facebook AI Similarity Search) |
| **LLM Inference** | Ollama (Model: Mistral) |
| **Database** | SQLite (Development) |
| **Tools** | Postman, Git |

---

## 📂 Project Structure

```text
ai_knowledge_assistant/
├── accounts/               # Authentication APIs (Register/Login)
├── documents/              # Document CRUD & Permissions
├── ai_engine/              # RAG Logic (LangChain + LangGraph)
├── ai_knowledge_assistant/ # Core Settings & URL Routing
├── manage.py
└── requirements.txt

```

---

## ⚡ Getting Started

### 1. Prerequisites (The AI Engine)

This project requires **Ollama** to run the AI model locally.

1. Download Ollama from [ollama.com](https://ollama.com/download).
2. Pull the Mistral model:
```bash
ollama pull mistral

```


3. Ensure Ollama is running in the background.

### 2. Backend Setup

clone the repository and set up the Python environment:

```bash
# 1. Create virtual environment
python -m venv venv

# 2. Activate environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Apply migrations
python manage.py makemigrations
python manage.py migrate

# 5. Start the server
python manage.py runserver

```

*The server will start at `http://127.0.0.1:8000*`

---

## 📡 API Reference

All protected endpoints require the header: `Authorization: Bearer <access_token>`

### 👤 Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/auth/register/` | Register a new user |
| `POST` | `/api/auth/login/` | Login and receive JWT tokens |

### 📄 Documents (Protected)

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/documents/` | Upload/Create a new document |
| `GET` | `/api/documents/` | List all user documents |
| `GET` | `/api/documents/{id}/` | Retrieve specific document details |
| `PUT/PATCH` | `/api/documents/{id}/` | Update a document |
| `DELETE` | `/api/documents/{id}/` | Delete a document |

### 🤖 AI Question Answering

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/ask/` | Ask a question about a specific document |

**Sample AI Request Body:**

```json
{
    "document_id": 1,
    "question": "What are the core concepts of LangChain?"
}

```

---

## 🧠 How the AI Works

1. **Ingestion:** When a question is asked, the system reads the target document.
2. **Embedding:** Text is converted into vector embeddings.
3. **Retrieval:** FAISS retrieves the specific paragraphs relevant to the user's question.
4. **Synthesis:** LangGraph constructs a prompt containing the question and the retrieved context.
5. **Generation:** The local Mistral model generates an answer based *only* on the provided context.

---

## 🔮 Future Roadmap

* [ ] Frontend integration (React/Vue)
* [ ] Persistent vector storage (pgvector or ChromaDB)
* [ ] Role-Based Access Control (RBAC)
* [ ] Docker & Docker Compose support
* [ ] Fallback support for Cloud LLMs (OpenAI/Anthropic)

---

**Author:** AI + Backend Engineering Mini Project
