FROM python:3
ENV PYTHONUNBUFFERED=1
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/

# OpenCV required package
RUN apt-get update
RUN apt-get install -y libgl1-mesa-dev

RUN pip install -r requirements.txt
COPY . /code/