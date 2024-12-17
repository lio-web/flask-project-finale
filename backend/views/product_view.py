from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.models import db, Product

product_bp = Blueprint('product_bp', __name__)

# Add product
@product_bp.route("/products", methods=["POST"])
@jwt_required()
def add_product():
    data = request.get_json()
    name = data['name']
    price = data['price']
    description = data.get('description', '')  # Optional field
    image = data.get('image', '')  # Optional field

    new_product = Product(name=name, description=description, image=image, price=price)
    db.session.add(new_product)
    db.session.commit()

    return jsonify({"success": "Product added successfully!"}), 201

# Fetch all products
@product_bp.route("/products")
def get_products():
    products = Product.query.all()
    product_list = []

    for product in products:
        product_list.append({
            'id': product.id,
            'name': product.name,
            'description': product.description,
            'image': product.image,
            'price': product.price
        })

    return jsonify(product_list), 200

# Fetch single product
@product_bp.route("/products/<int:product_id>")
def get_product(product_id):
    product = Product.query.get(product_id)

    if product:
        product_data = {
            'id': product.id,
            'name': product.name,
            'description': product.description,
            'image': product.image,
            'price': product.price
        }
        return jsonify(product_data), 200
    else:
        return jsonify({"error": "Product not found!"}), 404

# Update product
@product_bp.route("/products/<int:product_id>", methods=["PUT"])
@jwt_required()
def update_product(product_id):
    product = Product.query.get(product_id)

    if product:
        data = request.get_json()

        # Check if the new values already exist for other products
        check_name = Product.query.filter(Product.id != product_id, Product.name == data['name']).first()

        if check_name:
            return jsonify({"error": "Product name already exists!"}), 400

        product.name = data['name']
        product.description = data.get('description', '')
        product.image = data.get('image', '')

        db.session.commit()
        return jsonify({"success": "Product updated successfully"}), 200
    else:
        return jsonify({"error": "Product not found!"}), 404

# Delete product
@product_bp.route("/products/<int:product_id>", methods=["DELETE"])
@jwt_required()
def delete_product(product_id):
    product = Product.query.get(product_id)

    if product:
        db.session.delete(product)
        db.session.commit()
        return jsonify({"success": "Product deleted successfully"}), 200
    else:
        return jsonify({"error": "Product not found!"}), 404