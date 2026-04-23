import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import TourCard from '../shared/TourCard'; // <-- Namma Smart Card-ai Import pannurom

const Tours = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        // Puthusu (Update this):
const res = await fetch('https://tour-app-backend-cc7h.onrender.com/api/v1/tours');
        const result = await res.json();
        setTours(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTours();
  }, []);

  return (
    <>
      <section className="pt-5">
        <Container>
            <Row>
                <Col lg="12" className="mb-5">
                    <h2 className="text-center text-primary">All Available Tours ✈️</h2>
                </Col>
            </Row>
            <Row>
                {/* Ippo ovvoru tour-kum namma Smart TourCard-ai use panrom */}
                {tours.map((tour) => (
                    <Col lg="3" className="mb-4" key={tour._id}>
                        <TourCard tour={tour} />
                    </Col>
                ))}
            </Row>
        </Container>
      </section>
    </>
  );
};

export default Tours;