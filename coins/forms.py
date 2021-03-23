from django import forms
import cv2
import numpy as np
import io
import base64


class ProcessImageMixin:
    def process_image(self):
        self.get_shape()
        self.get_avg_color()
        self.get_circles()

    def get_shape(self):
        self.dimensions = [*self.img.shape[:2]]
        return self.dimensions

    def get_avg_color(self):
        avg_color_per_row = np.average(self.img, axis=0)
        self.avg_color = [*map(int, np.average(avg_color_per_row, axis=0))]
        return self.avg_color

    def get_circles(self):
        img = self.img
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        gray_blurred = cv2.blur(gray, (3, 3))
        circles = cv2.HoughCircles(gray_blurred, cv2.HOUGH_GRADIENT, 0.8, 40)
        coins = []
        for pt in circles[0, :]:
            a, b, r = pt[:3]
            cv2.circle(img, (a, b), int(r), (0, 0, 255), 2)
            coins.append(float(r))
        self.coins = coins
        _, buffer = cv2.imencode(".jpg", img)
        io_buffer = io.BytesIO(buffer)
        self.image_base64 = base64.encodebytes(io_buffer.getvalue()).decode('utf-8')


class UploadForm(
    ProcessImageMixin,
    forms.Form
):
    image = forms.FileField(error_messages={"required": "Пожалуйста, загрузите картинку!"})

    def clean_image(self):
        try:
            image = self.cleaned_data.get("image")
            file_bytes = np.asarray(bytearray(image.read()), dtype=np.uint8)
            self.img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
        except Exception as e:
            self.add_error("image", "Ошибка при обработке изображения!")
            print(e)

    def proceed(self, request):
        self.process_image()
        return True
