import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../styles/about.css';

const About = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="6">
            <div className="about__content">
              <h4 className="section__subtitle" style={{color: '#faa935', fontWeight: '600'}}>About Us</h4>
              <h2>Explore the World with <span style={{color: '#faa935'}}>TravelWorld</span></h2>
              <p className="mt-4">
                Welcome to TravelWorld, your number one source for all things travel. 
                We're dedicated to giving you the very best of tour experiences, with a focus on reliability, 
                customer service, and uniqueness.
              </p>
              <p>
                Founded in 2024, TravelWorld has come a long way from its beginnings. 
                When we first started out, our passion for "travel for everyone" drove us to start our own travel booking agency. 
                We now serve customers all over India and are thrilled that we're able to turn our passion into our own website.
              </p>
              
              <div className="about__stats d-flex align-items-center gap-5 mt-5">
                 <div className="stat__item">
                    <h3 style={{color: '#faa935'}}>12k+</h3>
                    <p>Successful Trips</p>
                 </div>
                 <div className="stat__item">
                    <h3 style={{color: '#faa935'}}>2k+</h3>
                    <p>Regular Clients</p>
                 </div>
                 <div className="stat__item">
                    <h3 style={{color: '#faa935'}}>15+</h3>
                    <p>Years Experience</p>
                 </div>
              </div>
            </div>
          </Col>

          <Col lg="6">
            <div className="about__img">
              <img 
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800" 
                alt="about-us" 
                className="w-100 rounded-4 shadow"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;