from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.conf import settings
import requests
from django.views.decorators.csrf import csrf_exempt
import  json
from django.http import JsonResponse
from django.contrib.auth import authenticate, login as auth_login ,logout



class HubSpotContactsAPIView(APIView):
   
    def get(self, request):
        # HubSpot API URL for fetching contacts
        url = "https://api.hubapi.com/crm/v3/objects/contacts"
        headers = {
            "Authorization": f"Bearer {settings.HUBSPOT_API_KEY}",
            "Content-Type": "application/json",
        }

        # Make the request to HubSpot
        response = requests.get(url, headers=headers)

        # Handle the response
        if response.status_code == 200:
            return Response(response.json(), status=status.HTTP_200_OK)
        else:
            return Response(
                {"error": "Failed to fetch contacts", "details": response.json()},
                status=response.status_code,
            )
class HubspotDealsAPIVIEW(APIView):
    def get (self,request):
        url = "https://api.hubapi.com/crm/v3/objects/deals"
        headers = {
            "Authorization": f"Bearer {settings.HUBSPOT_API_KEY}",
            "Content-Type": "application/json",
        }

        # Make the request to HubSpot
        response = requests.get(url, headers=headers)

        # Handle the response
        if response.status_code == 200:
            return Response(response.json(), status=status.HTTP_200_OK)
        else:
            return Response(
                {"error": "Failed to fetch contacts", "details": response.json()},
                status=response.status_code,)

class HubspotDealsAPIVIEW(APIView):
    def get(self, request):
        url = "https://api.hubapi.com/crm/v3/objects/deals"
        headers = {
            "Authorization": f"Bearer {settings.HUBSPOT_API_KEY}",
            "Content-Type": "application/json",
        }

        # Make the request to HubSpot
        response = requests.get(url, headers=headers)

        # Handle the response
        if response.status_code == 200:
            return Response(response.json(), status=status.HTTP_200_OK)
        else:
            return Response(
                {"error": "Failed to fetch deals", "details": response.json()},
                status=response.status_code,
            )

class HubspotLinkConatctToDeals(APIView):
      def post(self, request):
        # Assuming the request body contains 'contact_id' and 'deal_id'
        contact_id = request.data.get('contact_id')
        deal_id = request.data.get('deal_id')

        if not contact_id or not deal_id:
            return Response(
                {"error": "Contact ID and Deal ID are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # HubSpot API URL for creating an association between a contact and a deal
        url = f"https://api.hubapi.com/crm/v3/objects/deals/{deal_id}/associations/contact/{contact_id}/deal_to_contact"

        headers = {
            "Authorization": f"Bearer {settings.HUBSPOT_API_KEY}",
            "Content-Type": "application/json",
        }

        # Make the request to HubSpot to create the association
        response = requests.put(url, headers=headers)

        if response.status_code == 200:
            return Response({"message": "Contact successfully linked to deal"}, status=status.HTTP_200_OK)
        else:
            return Response(
                {"error": "Failed to link contact to deal", "details": response.json()},
                status=response.status_code,
            )
@csrf_exempt
def custom_login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")

            if not username or not password:
                return JsonResponse({"error": "Username and password are required"}, status=400)

            user = authenticate(request, username=username, password=password)
            if user:
                auth_login(request, user)  # Use the alias to call the correct function
                return JsonResponse({"message": "Login successful"}, status=200)
            else:
                return JsonResponse({"error": "Invalid username or password"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    elif request.method == 'GET':
        return JsonResponse({"message": "Login endpoint. Use POST to log in."}, status=200)
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)

def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({"message": "Logout successful"}, status=200)
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)
@csrf_exempt
def logout_view(request):
    logout(request)
    return JsonResponse({"message": "Successfully logged out"}, status=200)