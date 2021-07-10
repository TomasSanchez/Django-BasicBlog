FROM python:3.6

ENV PYTHONUNBUFFERED 1

WORKDIR /backend

COPY requirements.txt requirements.txt

RUN pip3 install -r /backend/requirements.txt

COPY . .

# removed
# EXPOSE 8000