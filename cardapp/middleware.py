from django.conf import settings
from django.utils.deprecation import MiddlewareMixin


class MediaCORSMiddleware(MiddlewareMixin):

    def process_response(self, request, response):
        if request.path.startswith("/media/"):
            origin = request.headers.get("Origin")
            allowed_origins = getattr(settings, "CORS_ALLOWED_ORIGINS", [])

            if origin and origin in allowed_origins:
                response["Access-Control-Allow-Origin"] = origin
                response["Vary"] = "Origin"
            elif origin:
                response["Access-Control-Allow-Origin"] = origin
                response["Vary"] = "Origin"
            else:
                response["Access-Control-Allow-Origin"] = "*"

        return response