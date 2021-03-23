from django import forms
import cv2


class ProcessImageMixin:
    def process_image(self):
        image = self.cleaned_data.get("image")
        # Further actions with image using OpenCV
        print(image)


class UploadForm(
    ProcessImageMixin,
    forms.Form
):
    image = forms.FileField(required=False)

    def proceed(self, request):
        self.process_image()
        return True
