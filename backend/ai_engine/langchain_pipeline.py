from langchain_community.vectorstores import FAISS
from langchain_ollama import OllamaEmbeddings, OllamaLLM
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnablePassthrough, RunnableLambda


def format_docs(docs):
    """Convert Document objects into plain text"""
    return "\n\n".join(doc.page_content for doc in docs)


def run_langchain(document_text: str, question: str) -> str:

    # 1. Create embeddings using local Ollama model
    embeddings = OllamaEmbeddings(model="mistral")

    # 2. Create vector store
    vectorstore = FAISS.from_texts(
        texts=[document_text],
        embedding=embeddings
    )

    # 3. Create retriever
    retriever = vectorstore.as_retriever()

    # 4. Create LLM using Ollama
    llm = OllamaLLM(
        model="mistral",
        temperature=0,        # deterministic answers
    )

    # 5. Prompt template
    prompt = PromptTemplate.from_template(
        """You are an AI assistant answering questions strictly based on provided document context.

Context:
{context}

Question:
{question}

Answer clearly and concisely:"""
    )

    # 6. Build RAG chain
    chain = (
        {
            "context": retriever | RunnableLambda(format_docs),
            "question": RunnablePassthrough()
        }
        | prompt
        | llm
    )

    # 7. Run chain
    response = chain.invoke(question)

    return str(response)
