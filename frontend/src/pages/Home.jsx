import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import FeaturedTourList from '../components/Featured-tours/FeaturedTourList';
import Testimonials from '../components/Testimonial/Testimonials'; 
import TourCard from '../shared/TourCard';

const Home = () => {
  const [recommendedTours, setRecommendedTours] = useState([]);
  
  // LocalStorage-la irundhu user interest (category) edukkurom
  const userInterest = localStorage.getItem('userInterest');

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (userInterest) {
        try {
          // --- AI LOGIC: Fetching by Category ---
          // Backend routes-la namma /getTourBySearch nu maathunadhala URL-um adhu kethamaari irukku
          const res = await fetch(`http://localhost:8000/api/v1/tours/getTourBySearch?category=${userInterest}`);
          const result = await res.json();
          
          if (res.ok) {
            setRecommendedTours(result.data || []);
          }
        } catch (err) {
          console.log("Error fetching recommendations:", err);
        }
      }
    };
    fetchRecommendations();
  }, [userInterest]);

  return (
    <>
      {/* HERO SECTION */}
      <section style={{ paddingTop: '50px' }}>
        <Container>
          <Row className="align-items-center">
            <Col lg="6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <h3 className="bg-warning rounded-pill px-3 py-1 text-white" style={{fontSize: '1rem'}}>Know Before You Go</h3>
                  <img src="https://cdn-icons-png.flaticon.com/512/201/201623.png" alt="world" className='ms-2' style={{width:'40px'}}/>
                </div>
                <h1 className="mt-4 mb-4" style={{fontSize: '3rem', fontWeight: '700', lineHeight: '1.2'}}>
                  Traveling opens the door to creating <span className="text-warning">memories</span>
                </h1>
                <p className="mb-4 text-muted" style={{fontSize: '1.1rem', lineHeight: '2'}}>
                  Start your journey with us today! Explore the world with our premium packages designed just for you.
                </p>
              </div>
            </Col>
            <Col lg="2"><div className="hero__img-box"><img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500" alt="" className='w-100 rounded-4 shadow-sm' style={{height: '350px', objectFit: 'cover'}}/></div></Col>
            <Col lg="2"><div className="hero__img-box mt-4"><img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500" alt="" className='w-100 rounded-4 shadow-sm' style={{height: '350px', objectFit: 'cover'}} /></div></Col>
            <Col lg="2"><div className="hero__img-box mt-5"><img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500" alt="" className='w-100 rounded-4 shadow-sm' style={{height: '350px', objectFit: 'cover'}}/></div></Col>
          </Row>
        </Container>
      </section>

      {/* --- AI RECOMMENDATION SECTION (Based on Category) --- */}
      {recommendedTours.length > 0 && (
        <section className="pt-5">
          <Container>
            <Row>
              <Col lg="12" className="mb-4">
                <h4 className='section__subtitle' style={{color:'#faa935'}}>Recommended for You</h4>
                <h2 style={{color:'#0b2727', fontWeight:'800'}}>Because you are interested in <span className='text-warning'>{userInterest}</span> tours</h2>
              </Col>
              {recommendedTours.slice(0, 4).map(tour => (
                <Col lg="3" md="4" sm="6" className="mb-4" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      {/* FEATURED TOURS SECTION */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h2 style={{color:'#0b2727', fontWeight:'800', fontSize: '2.2rem'}}>Our Featured Tours</h2>
            </Col>
            <FeaturedTourList /> 
          </Row>
        </Container>
      </section>

      {/* TESTIMONIAL SECTION */}
      <section className="mt-5 mb-5 pb-5">
        <Container>
          <Row className="align-items-center bg-light p-4 rounded-4 shadow-sm">
            <Col lg="6">
              <div className="testimonial__img">
                <img src="https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" className="w-100 rounded-4 shadow-lg" style={{ maxHeight: '450px', objectFit: 'cover', display: 'block' }} onError={(e) => { e.target.style.display = 'none' }} />
              </div>
            </Col>
            <Col lg="6" className='ps-lg-5 mt-4 mt-lg-0'>
              <div className="testimonial__content">
                <h4 style={{color:'#faa935', fontWeight:'600', marginBottom:'10px'}}>Customer Satisfaction</h4>
                <h2 className='mb-4' style={{color:'#0b2727', fontWeight:'800'}}>What our travelers say about us</h2>
                <Testimonials /> 
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;