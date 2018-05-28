# catalog-api/__init__.py

from os import getenv

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


db_conf = {
    'USER': getenv('POSTGRES_USER'),
    'PASSWORD': getenv('POSTGRES_PASSWORD'),
    'HOST': getenv('POSTGRES_HOST'),
    'PORT': getenv('POSTGRES_PORT'),
    'DB': getenv('POSTGRES_DB')
}

for key, value in db_conf.items():
    try:
        if value is None:
            raise ValueError(
                'Invalid database configuration. {} is missing'.format(key))
    except ValueError as err:
        print(err)

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://{}:{}@{}:{}/{}'.format(
    db_conf['USER'], db_conf['PASSWORD'],
    db_conf['HOST'], db_conf['PORT'], db_conf['DB']
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = getenv('SECRET_KEY')

db = SQLAlchemy()
db.init_app(app)

CORS(app, origins="http://127.0.0.1:8080")
