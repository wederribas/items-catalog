# catalop-api/api.py

from flask import make_response, jsonify, request
from sqlalchemy import desc
from __init__ import app, db
from database_setup import User, Category, Item
from utils import get_userid_from_header


db.create_all(app=app)


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
    return make_response(jsonify(Category=categories_dict)), 201


@app.route('/categories', methods=['GET'])
def list_all_categories():
    categories = Category.query.order_by(Category.name).all()
    return make_response(
        jsonify(Categories=[c.serialize for c in categories])
    ), 200


@app.route('/categories/<int:category_id>', methods=['GET'])
def list_category(category_id):
    category = Category.query.filter_by(id=category_id).first()

    if category is None:
        return make_response(jsonify({
            'status': 'error',
            'message': 'Category not found'
        })), 404

    return make_response(jsonify(category.serialize)), 200


@app.route('/categories', methods=['POST'])
def add_category():
    new_category = Category(name=request.form['name'].strip())
    db.session.add(new_category)
    db.session.commit()

    return make_response(jsonify({
        'status': 'success',
        'message': 'Category has been successfully added'
    })), 201


@app.route('/categories/<int:category_id>', methods=['PUT'])
def edit_category(category_id):
    category = Category.query.filter_by(id=category_id).first()

    if category is None:
        return make_response(jsonify({
            'status': 'error',
            'message': 'Category not found'
        })), 404

    if request.form.get('name'):
        category.name = request.form['name'].strip()
    db.session.commit()

    return make_response(jsonify({
        'status': 'success',
        'message': 'Category has been successfully updated'
    })), 200


@app.route('/categories/<int:category_id>', methods=['DELETE'])
def delete_category(category_id):
    category = Category.query.filter_by(id=category_id).first()

    if category is None:
        return make_reponse(jsonify({
            'status': 'error',
            'message': 'Category not found'
        })), 404

    db.session.delete(category)
    db.session.commit()

    return make_response(jsonify({
        'status': 'success',
        'message': 'Category has been successfully deleted'
    })), 200


@app.route('/categories/<int:category_id>/items', methods=['GET'])
def list_category_items(category_id):
    category = Category.query.filter_by(id=category_id).first()

    if category is None:
        return make_response(jsonify({
            'status': 'error',
            'message': 'Category not found'
        })), 404

    items = (
        Item.query
        .filter_by(category_id=category.id)
        .order_by(Item.name)
        .all()
    )

    return make_response(
        jsonify(
            Items=[i.serialize for i in items],
            Category={'category_name': category.name}
        )
    ), 200


@app.route('/items', methods=['GET'])
def list_all_items():
    items_limit = request.args.get('limit')

    if items_limit:
        items = Item.query.order_by(desc(Item.id)).limit(items_limit).all()
    else:
        items = Item.query.all()

    items_dict = [i.serialize for i in items]
    for item in range(len(items_dict)):
        categories = (
            Category.query
            .filter_by(id=items_dict[item]['category_id'])
            .first()
        )
        items_dict[item]['category_name'] = categories.name

    return make_response(jsonify(Items=items_dict)), 200


@app.route('/items/<int:item_id>', methods=['GET'])
def list_item(item_id):
    item = Item.query.filter_by(id=item_id).first()

    if item is None:
        return make_response(jsonify({
            'status': 'error',
            'message': 'Item not found'
        })), 404

    return make_response(jsonify(item.serialize)), 200


@app.route('/items', methods=['POST'])
def add_item():
    request_json = request.get_json()

    auth_header = request.headers.get('Authorization')

    try:
        user_id = get_userid_from_header(auth_header)
    except Exception as e:
        return make_response(jsonify({
            'status': e.status,
            'message': e.message
        })), 401

    new_item = Item(
        name=request_json.get('name').strip(),
        description=request_json.get('description').strip(),
        image_url='https://default.png',
        category_id=request_json.get('category').strip(),
        user_id=user_id
    )
    db.session.add(new_item)
    db.session.commit()

    return make_response(jsonify({
        'status': 'success',
        'message': 'Item has been successfully added'
    })), 201


@app.route('/items/<int:item_id>', methods=['PUT'])
def edit_item(item_id):
    item = Item.query.filter_by(id=item_id).first()

    if item is None:
        return make_response(jsonify({
            'status': 'error',
            'message': 'Item not found'
        })), 404

    if request.form.get('name'):
        item.name = request.form['name'].strip()
    if request.form.get('description'):
        item.description = request.form['description'].strip()
    if request.form.get('image_url'):
        item.image_url = request.form['image_url'].strip()
    if request.form.get('category_id'):
        item.category_id = request.form['category_id'].strip()
    db.session.commit()

    return make_response(jsonify({
        'status': 'success',
        'message': 'Item has benn successfully updated'
    })), 200


@app.route('/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    item = Item.query.filter_by(id=item_id).first()

    if item is None:
        return make_response(jsonify({
            'status': 'error',
            'message': 'Item not found'
        })), 404

    db.session.delete(item)
    db.session.commit()

    return make_response(jsonify({
        'status': 'success',
        'message': 'Item has been successfully deleted'
    })), 200


@app.route('/users', methods=['POST'])
def register_user():
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
        auth_token = new_user.encode_auth_token(
            new_user.id)
    else:
        auth_token = user.encode_auth_token(user.id)

    return make_response(jsonify({
        'status': 'success',
        'message': 'User has been successfully registered',
        'auth_token': auth_token.decode()
    })), 201


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000, threaded=True)
