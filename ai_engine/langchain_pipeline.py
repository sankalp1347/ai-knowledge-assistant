from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.llms import Ollama
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnablePassthrough

def run_langchain(document_text: str, question: str) -> str:
    embeddings = OllamaEmbeddings(model="mistral")
    vectorstore = FAISS.from_texts([document_text], embeddings)
    retriever = vectorstore.as_retriever()

    llm = Ollama(model="mistral")

    prompt = PromptTemplate.from_template(
        """Answer strictly using the context below.
        Context:
        {context}

        Question:
        {question}
        """
    )

    chain = (
        {"context": retriever, "question": RunnablePassthrough()}
        | prompt
        | llm
    )

    return chain.invoke(question)
