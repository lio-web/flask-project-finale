from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.models import db, Cart, User, Product
from datetime import datetime

cart_bp = Blueprint('cart_bp', __name__)

# Add item to cart
@cart_bp.route("/carts", methods=["POST"])
@jwt_required()
def add_to_cart():
    data = request.get_json()
    product_id = data['product_id']
    user_id = get_jwt_identity()
    quantity = data.get('quantity', 1)

    # Check if the item is already in the cart
    existing_item = Cart.query.filter_by(product_id=product_id, user_id=user_id).first()
    if existing_item:
        existing_item.quantity += quantity
        db.session.commit()
        return jsonify({"success": f"Quantity updated in the cart for product with id {product_id}"}), 200

    new_item = Cart(product_id=product_id, user_id=user_id, quantity=quantity)
    db.session.add(new_item)
    db.session.commit()

    return jsonify({"success": "Item added to the cart successfully!"}), 201

# Fetch all items in the cart
@cart_bp.route("/carts", methods=["GET"])
@jwt_required()
def get_cart():
    user_id = get_jwt_identity()
    items = Cart.query.filter_by(user_id=user_id).all()
    cart_items = []

    for item in items:
        cart_items.append({
            'id': item.id,
            'product_id': item.product_id,
            'user_id': item.user_id,
            'quantity': item.quantity,
            'created_at': item.created_at.strftime('%Y-%m-%d %H:%M:%S')
        })

    return jsonify(cart_items), 200

# Update quantity of an item in the cart
@cart_bp.route("/carts/<int:item_id>", methods=["PUT"])
@jwt_required()
def update_cart_item(item_id):
    item = Cart.query.get(item_id)

    if item:
        data = request.get_json()
        item.quantity = data['quantity']

        db.session.commit()
        return jsonify({"success": "Quantity updated in the cart successfully"}), 200
    else:
        return jsonify({"error": "Item not found in the cart!"}), 404

# Remove item from cart
@cart_bp.route("/carts/<int:item_id>", methods=["DELETE"])
@jwt_required()
def remove_from_cart(item_id):
    item = Cart.query.get(item_id)

    if item:
        db.session.delete(item)
        db.session.commit()
        return jsonify({"success": "Item removed from the cart successfully"}), 200
    else:
        return jsonify({"error": "Item not found in the cart!"}), 404