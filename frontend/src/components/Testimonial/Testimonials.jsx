import React, { useState, useEffect } from 'react';

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [allReviews, setAllReviews] = useState([]);

  const defaultReviews = [
    { name: "Janani", text: "Amazing experience! TravelWorld made my trip very smooth. Highly recommended!" },
    { name: "Vicky", text: "Best price and great hotels. Great support from the team during the tour." },
    { name: "Arun", text: "The customer support was excellent. Everything was well organized by the team." }
  ];

  useEffect(() => {
    const userFeedbacks = JSON.parse(localStorage.getItem('userReviews')) || [];
    setAllReviews([...defaultReviews, ...userFeedbacks]);
  }, []);

  useEffect(() => {
    if (allReviews.length > 0) {
      const timer = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % allReviews.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [allReviews]);

  if (allReviews.length === 0) return null;

  return (
    <div style={{ 
      padding: '30px', background: '#fff', borderRadius: '20px', 
      minHeight: '220px', borderLeft: '8px solid #faa935',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)', marginTop: '20px'
    }}>
      <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#444', lineHeight: '1.6', minHeight: '80px' }}>
        "{allReviews[index].text}"
      </p>
      
      <div className='d-flex align-items-center gap-3 mt-4'>
        {/* ENGAIYUM IMG TAG ILLAI - ONLY ICON */}
        <div style={{
          width: '55px', height: '55px', background: '#faa935', 
          borderRadius: '50%', display: 'flex', alignItems: 'center', 
          justifyContent: 'center', color: '#fff', fontSize: '1.5rem'
        }}>
          <i className="ri-user-3-fill"></i> 
        </div>

        <div>
          <h6 className='mb-0 fw-bold' style={{ color: '#0b2727' }}>{allReviews[index].name}</h6>
          <p className='mb-0 text-muted' style={{ fontSize: '0.85rem' }}>Verified Traveler</p>
        </div>
      </div>

      <div className="d-flex gap-2 mt-4">
        {allReviews.map((_, i) => (
          <div key={i} style={{
            width: i === index ? '25px' : '8px', height: '8px', 
            borderRadius: '10px', background: i === index ? '#faa935' : '#ccc',
            transition: 'all 0.3s ease'
          }}></div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;