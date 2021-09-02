FROM python:3

ENV PYTHONUNBUFFERED=0

WORKDIR /backend

COPY requirements.txt /backend/

RUN pip3 install --no-cache-dir -r requirements.txt

COPY . .

RUN python manage.py collectstatic --noinput

# Give permissions to file
RUN chmod +x ./wait-for-it.sh

# CMD ["./wait-for-it.sh" , "localhost:5432" , "--strict" , "--timeout=3" , "--", "&&", "python", "manage.py", "makemigrations", "python", "manage.py", "migrate"]
CMD ./wait-for-it.sh db:5432 --strict --timeout=3 -- && python manage.py makemigrations && python manage.py migrate && gunicorn core.wsgi --bind 0.0.0.0:8000
# CMD wait.sh db 5432 && \
#     python manage.py makemigrations && \
#     python manage.py migrate && \
#     gunicorn core.wsgi --bind 0.0.0.0:8000


# FROM python:3.6

# ENV PYTHONUNBUFFERED 1

# WORKDIR /backend

# COPY requirements.txt requirements.txt

# RUN pip3 install -r /backend/requirements.txt

# COPY . .
# removed
# EXPOSE 8000

# added
# RUN apk add --update --no-cache postgresql-client && \
#     apk add --update --no-cache --virtual .tmp-deps \
#         build-base postgresql-dev musl-dev linux-headers && \
#     pip3 install -r /requirements.txt && \
#     apk del .tmp-deps && \
#     adduser --disabled-password --no-create-home app && \
#     mkdir -p /vol/web/static && \
#     mkdir -p /vol/web/media && \
#     chown -R app:app /vol && \
#     chmod -R 755 /vol && \
#     chmod -R +x /scripts

# RUN  pip3 install -r /requirements.txt

# COPY . .

# USER app
