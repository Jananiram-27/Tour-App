import React, { useState, useEffect } from 'react';
import TourCard from '../../shared/TourCard';
import { Col } from 'reactstrap';

const FeaturedTourList = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        // ✅ FIX: Added "/tours" to the URL
        const res = await fetch('https://tour-app-backend-cc7h.onrender.com/api/v1/tours'); 
        
        const result = await res.json();

        if (res.ok) {
          // Featured tours-ai filter panrom
          const featuredData = result.data.filter(tour => tour.featured === true);
          setTours(featuredData);
        }
      } catch (err) {
        console.log("Featured Tours Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  if (loading) return <h4>Loading Featured Tours...</h4>;

  return (
    <>
      {tours?.length > 0 ? (
        tours.map(tour => (
          <Col lg="3" md="4" sm="6" className="mb-4" key={tour._id}>
            <TourCard tour={tour} />
          </Col>
        ))
      ) : (
        <Col lg="12"><h4 className="text-center">No Featured Tours Found</h4></Col>
      )}
    </>
  );
};

export default FeaturedTourList;