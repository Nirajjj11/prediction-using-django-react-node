from rest_framework.decorators import api_view
from rest_framework.response import Response
from prediction.services.prediction_service import predict

@api_view(['POST'])
def prediction_view(request):
      features = request.data.get("features")
      result = predict(features)
      return Response({"prediction": result})