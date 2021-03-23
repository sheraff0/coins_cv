FROM python:3.8-slim-buster
ENV PYTHONUNBUFFERED=1
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/

# OpenCV required package
RUN apt-get update
RUN apt-get install -y libgl1-mesa-dev libglib2.0-0

RUN pip install -r requirements.txt
COPY . /code/