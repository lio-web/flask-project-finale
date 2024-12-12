from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Rating, Product, User

rating_bp = Blueprint('rating_bp', __name__)

# Add rating
@rating_bp.route("/ratings", methods=["POST"])
@jwt_required()
def add_rating():
    
    data = request.get_json()
    product_id = data['product_id']
    user_id = get_jwt_identity()
    rating_value = data['rating']

    # Check if the product exists
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found!"}), 404

    # Check if the user has already rated the product
    existing_rating = Rating.query.filter_by(product_id=product_id, user_id=user_id).first()
    if existing_rating:
        return jsonify({"error": "User has already rated this product!"}), 400

    # Validate rating value (adjust the range based on your requirements)
    if not (1 <= rating_value <= 5):
        return jsonify({"error": "Invalid rating value! Must be between 1 and 5."}), 400

    new_rating = Rating(product_id=product_id, user_id=user_id, rating=rating_value)
    db.session.add(new_rating)
    db.session.commit()

    return jsonify({"success": "Rating added successfully!"}), 201

# Fetch all ratings for a product
@rating_bp.route("/ratings/<int:product_id>")
def get_ratings(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found!"}), 404
    
    ratings = Rating.query.filter_by(product_id=product_id).all()
    rating_list = []

    for rating in ratings:
        rating_list.append({
            'id': rating.id,
            'product_id': rating.product_id,
            'user_id': rating.user_id,
            'rating': rating.rating
        })

    # Optionally, calculate the average rating
    avg_rating = db.session.query(db.func.avg(Rating.rating)).filter_by(product_id=product_id).scalar()
    return jsonify({
        'ratings': rating_list,
        'average_rating': avg_rating
    }), 200

# Fetch single rating
@rating_bp.route("/ratings/<int:rating_id>")
def get_rating(rating_id):
    rating = Rating.query.get(rating_id)

    if rating:
        rating_data = {
            'id': rating.id,
            'product_id': rating.product_id,
            'user_id': rating.user_id,
            'rating': rating.rating
        }
        return jsonify(rating_data), 200
    else:
        return jsonify({"error": "Rating not found!"}), 404

# Update rating (Not necessary for typical ratings, but included for completeness)
@rating_bp.route("/ratings/<int:rating_id>", methods=["PUT"])
@jwt_required()
def update_rating(rating_id):
    rating = Rating.query.get(rating_id)

    if rating:
        data = request.get_json()
        rating.rating = data['rating']
        
        db.session.commit()
        return jsonify({"success": "Rating updated successfully"}), 200
    else:
        return jsonify({"error": "Rating not found!"}), 404

# Delete rating
@rating_bp.route("/ratings/<int:rating_id>", methods=["DELETE"])
@jwt_required()
def delete_rating(rating_id):
    rating = Rating.query.get(rating_id)

    if rating:
        db.session.delete(rating)
        db.session.commit()
        return jsonify({"success": "Rating deleted successfully"}), 200
    else:
        return jsonify({"error": "Rating not found!"}), 404
