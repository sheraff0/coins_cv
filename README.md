Backend webdev test project 2021-03
===
Example setup of __Coins CV__ Django web app.

Running in local environment:
-
1) In project root, create `.env` file with:
`SECRET_KEY=<key>`
and optionally `DB_NAME`, `DB_USER`, `DB_PASSWORD` variables.

2) Build and run docker image:

`docker-compose build`

`docker-compose run web python manage.py migrate`

`docker-compose run web python manage.py createsuperuser`

`docker-compose up`

3) Hence, ready to accept requests at:

`http://0.0.0.0:8000/`
