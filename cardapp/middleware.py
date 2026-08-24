from django.conf import settings
from django.utils.deprecation import MiddlewareMixin


class MediaCORSMiddleware(MiddlewareMixin):

    def process_response(self, request, response):
        if request.path.startswith("/media/"):
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
            response["Access-Control-Allow-Headers"] = "*"

        return response