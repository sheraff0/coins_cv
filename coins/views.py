from django.views.generic import TemplateView
from django.views.generic.edit import FormMixin
from django.views import View
from django.http import JsonResponse

from .forms import UploadForm


class CoinsView(TemplateView):
    template_name = "coins.html"


class ProcessImageView(FormMixin, View):
    form_class = UploadForm

    def post(self, request, *args, **kwargs):
        form = self.get_form()
        if form.is_valid():
            if form.proceed(request):
                return JsonResponse({
                    'message': 'ok',
                    'results': {'definition': '700x400'}
                })
        errors = {error[0]: error[1][0].message for error in form.errors.as_data().items()}
        return JsonResponse({
            'errors': errors,
        })
