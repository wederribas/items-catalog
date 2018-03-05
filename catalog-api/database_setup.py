import datetime
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Text, nullable=False)
    name = db.Column(db.Text, nullable=False)
    avatar = db.Column(db.Text, nullable=True)

    @property
    def serialize(self):
        return {
            'id': self.id,
            'uid': self.uid,
            'name': self.name,
            'avatar': self.avatar
        }     


class Category(db.Model):
    __tablename__ = 'category'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name
        }


class Item(db.Model):
    __tablename__ = 'item'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    image_url = db.Column(db.Text, nullable=False)
    creation_timestamp = db.Column(
        db.DateTime, default=datetime.datetime.utcnow)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'),
        nullable=False)
    category = db.relationship('Category',
        backref=db.backref('items', lazy=True))

    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'image_url': self.image_url,
            'creation_timestamp': self.creation_timestamp,
            'category_id': self.category_id
        }
