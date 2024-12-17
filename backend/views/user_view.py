from models import db, User
from flask import request, jsonify, Blueprint
from werkzeug.security import generate_password_hash
from flask_jwt_extended import  jwt_required, get_jwt_identity

user_bp = Blueprint('user_bp', __name__)


# add user
@user_bp.route("/users", methods=["POST"])
def add_users():
    data = request.get_json()
    username = data['username']
    email = data['email']
    phone = data['phone']
    password = generate_password_hash(data['password'], )

    check_username = User.query.filter_by(username=username).first()
    check_email = User.query.filter_by(email=email).first()
    check_phone = User.query.filter_by(phone=phone).first()

    if check_username or check_email or check_phone:
        return jsonify({"error": "User email/username/phone already exist!"})

    else:
        new_user = User(email=email, password=password, username=username, phone=phone)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"success": "User added successfully!"}), 201

# fetch all users
@user_bp.route("/users")
def get_users():
    users = User.query.all()
    user_list = []
    for user in users:
        user_list.append({
            'id': user.id,
            'username': user.username,
            'phone': user.phone,
            'email': user.email
        })
    return jsonify(user_list), 200

# fetch single user
@user_bp.route("/users/<int:user_id>")
def get_user(user_id):
    user = User.query.get(user_id)
    user_list = []
    
    if user:
        user_list.append({
            'id': user.id,
            'username': user.username,
            'phone': user.phone,
            'email': user.email
        })
        return jsonify(user_list), 200

    else:
        return jsonify({"error":"User not found!"}), 404

# update user
@user_bp.route("/users/<int:user_id>", methods=["PUT"])
@jwt_required()
def update_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found!"}), 404

    data = request.get_json()
    username = data['username']
    email = data['email']
    phone = data['phone']

    # Check if the new values already exist for other users
    check_username = User.query.filter(User.id != user_id, User.username == username).first()
    check_email = User.query.filter(User.id != user_id, User.email == email).first()
    check_phone = User.query.filter(User.id != user_id, User.phone == phone).first()

    if check_username or check_email or check_phone:
        return jsonify({"error": "User email/username/phone already exist!"})

    user.username = username
    user.email = email
    user.phone = phone

    db.session.commit()
    return jsonify({"success": "User updated successfully"}), 200

# delete user
@user_bp.route("/users/<int:user_id>", methods=["DELETE"])
@jwt_required()
def delete_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found!"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"success": "User deleted successfully"}), 200