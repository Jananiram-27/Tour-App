import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import TourCard from '../shared/TourCard';

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch('https://tour-app-backend-cc7h.onrender.com/api/v1/tours');
        const result = await res.json();
        
        // Backend success response-ah nu check panrom
        if (res.ok) {
          setTours(result.data || []); 
        }
      } catch (err) {
        console.log("Error fetching tours:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  if (loading) return <h4 className="text-center pt-5">Loading available tours... ✈️</h4>;

  return (
    <section className="pt-5">
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <h2 className="text-center text-primary">All Available Tours ✈️</h2>
          </Col>
        </Row>
        <Row>
          {tours?.length > 0 ? (
            tours.map((tour) => (
              <Col lg="3" md="4" sm="6" className="mb-4" key={tour._id}>
                <TourCard tour={tour} />
              </Col>
            ))
          ) : (
            <Col lg="12">
              <h4 className="text-center text-muted">No tours found in the database.</h4>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default Tours;