# catalog-api/database_setup.py

import datetime

import jwt
from __init__ import app, db


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.Text, nullable=False)
    uid = db.Column(db.Text, nullable=False)
    avatar = db.Column(db.Text, nullable=True)

    @property
    def serialize(self):
        return {
            'id': self.id,
            'email': self.email,
            'uid': self.uid,
            'avatar': self.avatar
        }

    def encode_auth_token(self, user_id):
        try:
            payload = {
                'exp': datetime.datetime.utcnow()
                + datetime.timedelta(days=0, minutes=120),
                'iat': datetime.datetime.utcnow(),
                'sub': user_id
            }
            return jwt.encode(
                payload,
                app.config.get('SECRET_KEY'),
                algorithm='HS256'
            )
        except Exception as e:
            return e

    @staticmethod
    def decode_auth_token(auth_token):
        try:
            payload = jwt.decode(auth_token, app.config.get('SECRET_KEY'))
            return payload['sub']
        except jwt.ExpiredSignatureError:
            return 'Token expired. Please, try again.'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please, try again.'


class Category(db.Model):
    __tablename__ = 'category'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)

    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name
        }


class Item(db.Model):
    __tablename__ = 'item'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    creation_timestamp = db.Column(
        db.DateTime, default=datetime.datetime.utcnow())
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'),
                            nullable=False)
    category = db.relationship('Category',
                               backref=db.backref('items', lazy=True))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),
                        nullable=False)
    user = db.relationship('User',
                           backref=db.backref('items', lazy=True))

    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'creation_timestamp': self.creation_timestamp,
            'category_id': self.category_id,
            'user_id': self.user_id
        }
