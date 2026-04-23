import React, { useState, useEffect } from 'react';
import TourCard from '../../shared/TourCard';
import { Col } from 'reactstrap';

const FeaturedTourList = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch('https://tour-app-backend-cc7h.onrender.com/api/v1'); // Backend Call
        const result = await res.json();
        // Verum "Featured" tours mattum edukkurom
        const featuredData = result.data.filter(tour => tour.featured === true);
        setTours(featuredData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTours();
  }, []);

  return (
    <>
      {tours.map(tour => (
        <Col lg="3" className="mb-4" key={tour._id}>
          <TourCard tour={tour} />
        </Col>
      ))}
    </>
  );
};

export default FeaturedTourList;