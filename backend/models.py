from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(70), unique=True, nullable=False)
    phone = db.Column(db.String(14), unique=True, nullable=False)
    password = db.Column(db.String(450), nullable=False)
    
    ratings = db.relationship('Rating', backref='user', lazy=True)
    shopping_cart = db.relationship('Cart', backref='user', lazy=True)

class TokenBlocklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(100), nullable=True)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    image = db.Column(db.String(255))
    price = db.Column(db.Float)
    
    ratings = db.relationship('Rating', backref='product', lazy=True)
    carts = db.relationship('Cart', backref='product', lazy=True)

class Rating(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False) 
    rating = db.Column(db.Integer, nullable=False)

class Cart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, default=1)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow)

# ABOVE IS MY models.py