from typing import TypedDict
from langgraph.graph import StateGraph
from .langchain_pipeline import run_langchain

class QAState(TypedDict):
    document: str
    question: str
    answer: str

def qa_node(state: QAState) -> QAState:
    """
    Single node that runs LangChain QA
    """
    answer = run_langchain(
        state["document"],
        state["question"]
    )
    state["answer"] = answer
    return state

# Create graph
graph = StateGraph(QAState)

# Add node
graph.add_node("qa_node", qa_node)

# Define flow
graph.set_entry_point("qa_node")
graph.set_finish_point("qa_node")

# Compile graph
qa_graph = graph.compile()
