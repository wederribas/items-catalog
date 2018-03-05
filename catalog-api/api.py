from os import getenv
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from database_setup import db, User, Category, Item


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
    db_conf['HOST'], db_conf['PORT'], db_conf['DB'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
db.create_all(app=app)


@app.route('/')
def hello_world():
    return jsonify({
        'status': 'success',
        'message': 'What is up doc!'
    })


@app.route('/categories', methods=['GET'])
def list_all_categories():
    categories = Category.query.all()
    return jsonify(Categories=[c.serialize for c in categories])


@app.route('/categories', methods=['POST'])
def add_category():
    new_category = Category(name=request.form['name'])
    db.session.add(new_category)
    db.session.commit()

    return jsonify({
        'status': 'success',
        'message': 'Category has been successfully created'
    })


@app.route('/categories/<int:category_id>', methods=['PUT'])
def edit_category(category_id):
    category = Category.query.filter_by(id=category_id).first()

    if category is None:
        response = jsonify({
            'status': 'error',
            'message': 'Category not found'
        })
        response.status_code = 204
        return response

    category.name = request.form['new_name']
    db.session.commit()

    return jsonify({
        'status': 'success',
        'message': 'Category name has been updated successfully'
    })


@app.route('/categories/<int:category_id>', methods=['DELETE'])
def delete_category(category_id):
    category = Category.query.filter_by(id=category_id).first()

    if category is None:
        response = jsonify({
            'status': 'error',
            'message': 'Category not found'
        })
        response.status_code = 204
        return response

    db.session.delete(category)
    db.session.commit()

    return jsonify({
        'status': 'success',
        'message': 'Category has been successfully deleted'
    })


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
