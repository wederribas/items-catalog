from os import getenv
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
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

CORS(app)


@app.route('/catalog.json')
def list_catalog():
    categories = Category.query.order_by(Category.name).all()
    categories_dict = [c.serialize for c in categories]
    for category in range(len(categories_dict)):
        items = (
            Item.query
            .filter_by(category_id=categories_dict[category]['id'])
            .order_by(Item.name)
            .all()
        )
        items_dict = [i.serialize for i in items]
        if items_dict:
            categories_dict[category]['Items'] = items_dict
    return jsonify(Category=categories_dict)


@app.route('/categories', methods=['GET'])
def list_all_categories():
    categories = Category.query.all()
    return jsonify(Categories=[c.serialize for c in categories])


@app.route('/categories', methods=['POST'])
def add_category():
    new_category = Category(name=request.form['name'].strip())
    db.session.add(new_category)
    db.session.commit()

    return jsonify({
        'status': 'success',
        'message': 'Category has been successfully added'
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

    if request.form.get('name'):
        category.name = request.form['name'].strip()
    db.session.commit()

    return jsonify({
        'status': 'success',
        'message': 'Category has been successfully updated'
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


@app.route('/items', methods=['GET'])
def list_all_items():
    items = Item.query.all()
    return jsonify(Items=[i.serialize for i in items])


@app.route('/items', methods=['POST'])
def add_item():
    new_item = Item(
        name=request.form['name'].strip(),
        description=request.form['description'].strip(),
        image_url=request.form['image_url'].strip(),
        category_id=request.form['category_id'].strip()
    )
    db.session.add(new_item)
    db.session.commit()

    return jsonify({
        'status': 'success',
        'message': 'Item has been successfully added'
    })


@app.route('/items/<int:item_id>', methods=['PUT'])
def edit_item(item_id):
    item = Item.query.filter_by(id=item_id).first()

    if item is None:
        response = jsonify({
            'status': 'error',
            'message': 'Item not found'
        })
        response.status_code = 204

        return response

    if request.form.get('name'):
        item.name = request.form['name'].strip()
    if request.form.get('description'):
        item.description = request.form['description'].strip()
    if request.form.get('image_url'):
        item.image_url = request.form['image_url'].strip()
    if request.form.get('category_id'):
        item.category_id = request.form['category_id'].strip()
    db.session.commit()

    return jsonify({
        'status': 'success',
        'message': 'Item has benn successfully updated'
    })


@app.route('/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    item = Item.query.filter_by(id=item_id).first()

    if item is None:
        response = jsonify({
            'status': 'error',
            'message': 'Item not found'
        })
        response.status_code = 204

        return response

    db.session.delete(item)
    db.session.commit()

    return jsonify({
        'status': 'success',
        'message': 'Item has been successfully deleted'
    })


@app.route('/users', methods=['POST'])
def add_user():
    request_json = request.get_json()

    user = User.query.filter_by(email=request_json.get('email')).first()

    if user is None:
        new_user = User(
            email=request_json.get('email'),
            uid=request_json.get('uid'),
            avatar=request_json.get('avatar')
        )
        db.session.add(new_user)
        db.session.commit()

        return jsonify({
            'status': 'success',
            'message': 'User has been successfully added'
        })

    return jsonify({
        'status': 'success',
        'message': 'User already exists. Do nothing'
    })


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
