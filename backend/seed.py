from datetime import datetime
from models import db, User, Product, Rating, Cart
from flask import Flask

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///business.db'
db.init_app(app)

with app.app_context():
    db.create_all()

    # Seed data
    try:
        # Add users
        if not User.query.filter_by(username='user5').first():
            user1 = User(username='user5', email='user5@example.com', phone='6345567890', password='password5')
            db.session.add(user1)
        if not User.query.filter_by(username='user6').first():
            user2 = User(username='user6', email='user6@example.com', phone='6956543210', password='password6')
            db.session.add(user2)

        # Add products
        products_data = [
            {
   
    'name': 'Power Drill',
    'description': 'A versatile power tool for drilling holes and driving screws.',
    'price': 4999,
    'image': 'https://media.istockphoto.com/id/184294297/photo/cordless-yellow-power-drill-isolated-on-a-white-background.jpg?s=612x612&w=is&k=20&c=91Bxzan4opUIBzLtPNW415TtF_mpVP_2cP68HJffoWQ=',
  },
  {
  
    'name': 'Circular Saw',
    'description': 'A powerful saw for cutting wood, metal, or plastic with precision.',
    'price': 8999,
    'image': 'https://media.istockphoto.com/id/470862472/photo/circular-saw.jpg?b=1&s=612x612&w=0&k=20&c=fkxrXwMaT4-sUCXlJhvU0n71rFDHYQ6WgLH4sX8gSj4=',
  },
  {
  
    'name': 'Adjustable Wrench Set',
    'description': 'A set of adjustable wrenches for various sizes of nuts and bolts.',
    'price': 1999,
    'image': 'https://images.pexels.com/photos/416412/pexels-photo-416412.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
 
    'name': 'Cordless Screwdriver Kit',
    'description': 'A compact and cordless screwdriver for quick and easy screwing tasks.',
    'price': 29990,
    'image': 'https://images.pexels.com/photos/5691656/pexels-photo-5691656.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
   
    'name': 'Toolbox with Organizers',
    'description': 'A sturdy toolbox with multiple compartments for organizing your tools.',
    'price': 39099,
    'image': 'https://images.pexels.com/photos/8985918/pexels-photo-8985918.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
 
    'name': 'Digital Multimeter',
    'description': 'A versatile tool for measuring voltage, current, and resistance in electrical circuits.',
    'price': 2499,
    'image': 'https://images.pexels.com/photos/4398314/pexels-photo-4398314.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
  
    'name': 'Paint Sprayer Kit',
    'description': 'An efficient paint sprayer for quickly covering surfaces with a smooth coat of paint.',
    'price': 5999,
    'image': 'https://media.istockphoto.com/id/881817460/photo/close-up-of-a-spray-paint-gun-with-black-background.jpg?s=612x612&w=is&k=20&c=5snXrqKPyoyXrbiXPSlF7N3zJfNAm1RSgYnqCB40Uxk=',
  },
  {
   
    'name': 'Angle Grinder',
    'description': 'A powerful tool for cutting, grinding, and polishing metal or masonry.',
    'price': 3999,
    'image': 'https://www.tronic.co.ke/cdn/shop/files/PT5013.jpg?v=1692086760&width=700',
  },
  {
 
    'name': 'Digital Caliper',
    'description': 'A precise measuring instrument for accurate measurements of length and thickness.',
    'price': 1499,
   'image': 'https://media.istockphoto.com/id/145154206/photo/frontal-image-of-electronic-digital-caliper.jpg?b=1&s=612x612&w=0&k=20&c=RUkyl0exzwNkOkK1o14Oi9qhWHteN1Xw9suYJQYurAc=',
  },
  {
  
    'name': 'LED Work Light',
    'description': 'A portable and bright LED light for illuminating your workspace in low-light conditions.',
    'price': 1999,
   'image': 'https://media.istockphoto.com/id/519767669/photo/daylight-led-worklight.jpg?b=1&s=612x612&w=0&k=20&c=D1GrguI12hK4Xh1i5kEthToVg0bIE6TZRBqWYKdRtQY=',
  },
  {

    'name': 'Socket Set',
    'description': 'A comprehensive set of sockets and ratchets for various mechanical tasks.',
    'price': 49099,
    'image': 'https://media.istockphoto.com/id/1272439310/photo/set-of-socket-wrenches-on-wooden-bench.jpg?b=1&s=612x612&w=0&k=20&c=lGzpcLdlaD7kq_ZfUAf7vDDtu2_4p5pWymNY-7qc9V4=',
  },
  {
 
    'name': 'Stud Finder',
    'description': 'A handy tool for locating studs behind walls before mounting shelves or TVs.',
    'price': 1299,
    'image': 'https://media.istockphoto.com/id/491683523/photo/using-stud-finder-on-interior-home-wall.jpg?b=1&s=612x612&w=0&k=20&c=JAWCfUk_zWuUUWvm7zVBQCI4ZnbNzcXwrqNJohvZUzw=',
  },
  {

    'name': 'Chainsaw',
    'description': 'A powerful chainsaw for cutting down trees or trimming branches with ease.',
    'price': 12999,
    'image': 'https://media.istockphoto.com/id/476886690/photo/chainsaw.jpg?b=1&s=612x612&w=0&k=20&c=OgWB95vZ0vcGaEa_30EkagFZXAwdEw902a2WNQBjzxw=',
  },
  {

    'name': 'Soldering Iron Kit',
    'description': 'A complete kit for soldering electronic components and making electrical repairs.',
    'price': 3499,
    'image': 'https://images.pexels.com/photos/6768473/pexels-photo-6768473.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {

    'name': 'Digital Torque Wrench',
    'description': 'A torque wrench with digital display for precise tightening of nuts and bolts.',
    'price': 7999,
   'image': 'https://media.istockphoto.com/id/942151998/photo/digital-torque-wrench.jpg?b=1&s=612x612&w=0&k=20&c=kKyGCSq-v5Q6F4fQCROMcaw-8SkxIps17rdwS95njy0=',
  },
  {
    'name': 'Electric Screwdriver Set',
    'description': 'An electric screwdriver set with multiple attachments for quick and efficient screwing.',
    'price': 2999,
    'image': 'https://media.istockphoto.com/id/1309203916/photo/screwdriver-cut-out.jpg?b=1&s=612x612&w=0&k=20&c=nuod3uSZybaZyfuQGQgJue-2STCefFAvrLuH35V02gM=',
  },
  {
    'name': 'Bench Grinder',
    'description': 'A stationary grinder for sharpening blades, shaping metal, and other grinding tasks.',
    'price': 4999,
   'image': 'https://media.istockphoto.com/id/537254360/photo/bench-grinder-on-white.jpg?b=1&s=612x612&w=0&k=20&c=w3n1HKDVjg2Yg5gEbCj9VdU_9kJjQLiOaDGqnfSkoJE=',
  },
  {
    'name': 'Pipe Wrench',
    'description': 'A heavy-duty wrench designed for turning and holding pipes and fittings.',
    'price': 2299,
    'image': 'https://media.istockphoto.com/id/471344649/photo/pipe-wrench.jpg?s=612x612&w=0&k=20&c=Gb96x2GMgAMVcCTZIVFw5LA0aFmsx7ymwwlVop0N5UY=',
  },
  {
    'name': 'Corded Hammer Drill',
    'description': 'A powerful hammer drill for drilling into tough materials like concrete or brick.',
    'price': 7999,
    'image': 'https://media.istockphoto.com/id/104388779/photo/drill_03.jpg?s=612x612&w=0&k=20&c=OF3ZiaE0AkMuHeddGm25fYwlGA-Gyd5RCr8tjuqYERo=',
  },
  {
    'name': 'Miter Saw',
    'description': 'A precision saw for making accurate crosscuts and miter cuts in wood.',
    'price': 12999,
    'image': 'https://media.istockphoto.com/id/177005137/photo/power-miter-saw-shot-on-a-white-background.jpg?s=612x612&w=0&k=20&c=dV6zic1-qQZb-e6PQh01QOt6GeTR-bA0bxoqKzDCRmw=',
  },

        ]
        
        
        
        for product_data in products_data:
            product = Product.query.filter_by(name=product_data['name']).first()
            if product:
        # Update product fields
                product.description = product_data['description']
                product.price = product_data['price']
                product.image = product_data['image']  # Update image
            else:
        # Add new product
                product = Product(**product_data)
                db.session.add(product)


        # for product_data in products_data:
        #     if not Product.query.filter_by(name=product_data['name']).first():
        #         product = Product(**product_data)
        #         db.session.add(product)

        db.session.commit()

        # Add ratings
        user1 = User.query.filter_by(username='user5').first()
        user2 = User.query.filter_by(username='user6').first()
        products = Product.query.all()

        if user1 and user2 and len(products) >= 2:
            if not Rating.query.filter_by(user_id=user1.id, product_id=products[0].id).first():
                rating1 = Rating(product=products[0], user=user1, rating=5)
                db.session.add(rating1)
            if not Rating.query.filter_by(user_id=user2.id, product_id=products[1].id).first():
                rating2 = Rating(product=products[1], user=user2, rating=4)
                db.session.add(rating2)

        # Add cart items
        if user1 and user2 and len(products) >= 2:
            if not Cart.query.filter_by(user_id=user1.id, product_id=products[0].id).first():
                cart_item1 = Cart(user=user1, product=products[0], quantity=2, created_at=datetime.utcnow())
                db.session.add(cart_item1)
            if not Cart.query.filter_by(user_id=user2.id, product_id=products[1].id).first():
                cart_item2 = Cart(user=user2, product=products[1], quantity=1, created_at=datetime.utcnow())
                db.session.add(cart_item2)

        db.session.commit()
        print("Database seeded successfully.")
    except Exception as e:
        db.session.rollback()
        print(f"Error seeding database: {e}")
