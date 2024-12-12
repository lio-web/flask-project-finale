// pages/Home.js
import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { ProductContext } from '../context/ProductContext';

const Home = () => {

useContext(ProductContext);

  return (
    <Container className="">
      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel" data-bs-interval="1600">
        <ol className="carousel-indicators">
          <li data-bs-target="#carouselExample" data-bs-slide-to="0" className="active"></li>
          <li data-bs-target="#carouselExample" data-bs-slide-to="1"></li>
          <li data-bs-target="#carouselExample" data-bs-slide-to="2"></li>
          <li data-bs-target="#carouselExample" data-bs-slide-to="3"></li>
          <li data-bs-target="#carouselExample" data-bs-slide-to="4"></li>
          <li data-bs-target="#carouselExample" data-bs-slide-to="5"></li>
          <li data-bs-target="#carouselExample" data-bs-slide-to="6"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src="./images/black1.jpg" alt="First slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="./images/1234.webp" alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="./images/blacks.png" alt="Third slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="./images/1234.webp" alt="Fourth slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="./images/istockphoto-1280463653-612x612.jpg" alt="Fifth slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="./images/black.jpg" alt="Sixth slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="./images/white.png" alt="Seventh slide" />
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExample" role="button" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExample" role="button" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </a>
      </div>
      <h2 style={{ fontFamily: 'Impact, sans-serif', fontSize: '50px' }}>About Us!</h2>

      <p style={{ fontFamily: 'cursive', fontSize: '30px', color:'black' }}>At Multi Hardware Ltd, our primary mission is to create opportunities for you and to enhance our communities. To achieve this, we deliver high-quality general hardware and safety-wear products used in construction, manufacturing, home improvement, plumbing, & agriculture.

Our management philosophy is centered around building a strong, sustainable relationship with you, and our entire business set-up is designed to make transactions easy and efficient.
 
Come realize your vision at Multi Hardware Ltd.</p>
    </Container>
  );
};

export default Home;