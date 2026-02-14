from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from documents.models import Document
from .langgraph_flow import qa_graph

class AskAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        document_id = request.data.get("document_id")
        question = request.data.get("question")

        if not document_id or not question:
            return Response(
                {"error": "document_id and question are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            document = Document.objects.get(
                id=document_id,
                owner=request.user
            )
        except Document.DoesNotExist:
            return Response(
                {"error": "Document not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        # Run LangGraph
        result = qa_graph.invoke({
            "document": document.content,
            "question": question
        })

        return Response(
            {"answer": result["answer"]},
            status=status.HTTP_200_OK
        )
