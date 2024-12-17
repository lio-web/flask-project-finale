from backend.models import db, User,TokenBlocklist
from flask import request, jsonify, Blueprint
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from itsdangerous import URLSafeTimedSerializer
from flask_mail import Mail, Message

auth_bp = Blueprint('auth_bp', __name__)

# Configure Flask-Mail
mail = Mail()

# Secret key for token generation (keep it secure!)
SECRET_KEY = 'moringamoringamoringamoringa'

# Serializer for token generation and verification
serializer = URLSafeTimedSerializer(SECRET_KEY)

# add user
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']
    
    user = User.query.filter_by(email=email).first()

    if user:
        if check_password_hash(user.password, password):
            access_token = create_access_token(identity=user.id)
            return jsonify({"success": "Login successful", "access_token": access_token}), 200
        else:
            return jsonify({"error": "Invalid credentials"}), 401
    else:
        return jsonify({"error": "Invalid credentials"}), 401


# Get logged in user
@auth_bp.route("/authenticated_user", methods=["GET"])
@jwt_required()
def authenticated_user():
    current_user_id = get_jwt_identity()  # getting current user id
    user = User.query.get(current_user_id)

    if user:
        user_data = {
            'id': user.id,
            'username': user.username,
            'phone': user.phone,
            'email': user.email
        }
        return jsonify(user_data), 200
    else:
        return jsonify({"error": "User not found"}), 404


# Logout user
@auth_bp.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    jti = get_jwt()['jti']

    token_b = TokenBlocklist(jti=jti)
    db.session.add(token_b)
    db.session.commit()

    return jsonify({"success": "Logged out successfully!"}), 200


@auth_bp.route("/request_password_reset", methods=["POST"])
def request_password_reset():
    data = request.get_json()
    email = data.get('email')

    user = User.query.filter_by(email=email).first()

    if user:
        # Generate a unique token
        token = serializer.dumps(email, salt='password-reset')

        # Send reset email
        send_password_reset_email(email, token)

        return jsonify({"success": "Password reset email sent."}), 200
    else:
        return jsonify({"error": "User not found."}), 404


@auth_bp.route("/reset_password/<token>", methods=["POST"])
def reset_password(token):
    try:
        # Verify the token
        email = serializer.loads(token, salt='password-reset', max_age=3600)
    except Exception:
        return jsonify({"error": "Invalid or expired token."}), 400

    data = request.get_json()
    new_password = data.get('new_password')

    # Update the user's password
    user = User.query.filter_by(email=email).first()

    if user:
        user.password = generate_password_hash(new_password)
        db.session.commit()
        return jsonify({"success": "Password updated successfully."}), 200
    else:
        return jsonify({"error": "User not found."}), 404


def send_password_reset_email(email, token):
    reset_url = f"http://127.0.0.1:3000/{token}"
    subject = "Password Reset Request"
    body = f"Click the following link to reset your password: {reset_url}"

    message = Message(subject, recipients=[email], body=body)
    mail.send(message)