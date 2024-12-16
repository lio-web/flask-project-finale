from datetime import timedelta
from models import db, User, Product, Rating, Cart, TokenBlocklist
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

from flask_jwt_extended import JWTManager
from views import *

port = int(os.environ.get("PORT", 5000))
import os
from app import app

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///business.db'
CORS(app)

db.init_app(app)
migrate = Migrate(app, db)

jwt = JWTManager()
app.config["JWT_SECRET_KEY"] = "moringamoringamoringamoringa"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt.init_app(app)

app.register_blueprint(user_bp)
app.register_blueprint(product_bp)
app.register_blueprint(rating_bp)
app.register_blueprint(cart_bp)
app.register_blueprint(auth_bp)

# Operations CRUD

# JWT LOADER
@jwt.token_in_blocklist_loader
def token_in_blocklist_callback(jwt_header, jwt_data):
    jti = jwt_data['jti']
    token = TokenBlocklist.query.filter_by(jti=jti).first()
    if token:
        return token 
    else:
        return None
    
@app.route('/')
def home():
    return "Welcome to the Multi Hardware Store API!", 200    


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)