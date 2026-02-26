from django.http import JsonResponse


def custom_404(request, exception=None):
    return JsonResponse({
        'status': 'success',
        'message': 'Libronet API is running!',
        'error': 'Endpoint not found',
        'available_endpoints': {
            'auth': '/api/auth/',
            'categories': '/api/categories/',
            'admin': '/admin/'
        }
    }, status=404)


def api_root(request):
    return JsonResponse({
        'status': 'success',
        'message': 'Welcome to Libronet API',
        'version': '1.0',
        'endpoints': {
            'auth': {
                'signup': '/api/auth/signup/',
                'login': '/api/auth/login/',
                'logout': '/api/auth/logout/',
                'profile': '/api/auth/profile/'
            },
            'categories': '/api/categories/',
            'admin': '/admin/'
        }
    })
