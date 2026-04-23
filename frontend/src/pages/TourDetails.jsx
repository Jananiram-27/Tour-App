import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { useParams, useNavigate } from 'react-router-dom';
import TourMap from '../components/Map/TourMap';

const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  const [credentials, setCredentials] = useState({
    fullName: '',
    phone: '',
    guestSize: 1,
    bookAt: ''
  });

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    const fetchTour = async () => {
      try {
        // Puthusu (Update this):
const res = await fetch(`https://tour-app-backend-cc7h.onrender.com/api/v1/tours/${id}`);
        const result = await res.json();
        setTour(result.data);

        // --- AI LOGIC UPDATE: Track by CATEGORY instead of CITY ---
        if (result.data && result.data.category) {
          localStorage.setItem('userInterest', result.data.category);
          console.log("Interest Tracked:", result.data.category); // Debug panna easy-ah irukkum
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchTour();
    window.scrollTo(0, 0); 
  }, [id]);

  if (!tour) return <h4 className='text-center pt-5'>Loading...</h4>;

  const { photo, title, desc, price, city, distance, reviews } = tour;
  const serviceFee = 10;
  const totalAmount = Number(price) * Number(credentials.guestSize) + Number(serviceFee);

  const handleBookingClick = (e) => {
    e.preventDefault();
    if (!user) return alert("Please login to book your tour!");
    if (!credentials.fullName || !credentials.phone || !credentials.bookAt) return alert("Please fill all details!");

    alert("Redirecting to Stripe...");
    setTimeout(() => {
      alert(`Payment Successful! $${totalAmount} charged.`);
      navigate("/thank-you");
    }, 1500);
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8">
            <div className="tour__content">
              <img src={photo} alt={title} className='w-100 rounded shadow-sm' style={{ maxHeight: '400px', objectFit: 'cover' }} />
              <div className="tour__info border p-4 rounded mt-4 bg-white shadow-sm">
                <div className="d-flex align-items-center justify-content-between">
                   <h2 className='fw-bold'>{title}</h2>
                   <span className='d-flex align-items-center gap-1 text-muted'>
                      <i className="ri-star-fill text-warning"></i> ({reviews?.length || 0})
                   </span>
                </div>
                <div className="d-flex align-items-center gap-5 my-4">
                  <span><i className="ri-map-pin-line text-warning"></i> {city}</span>
                  <span><i className="ri-money-dollar-circle-line text-warning"></i> ${price} / person</span>
                  <span><i className="ri-map-pin-time-line text-warning"></i> {distance} k/m</span>
                </div>
                <hr /><h5 className='mt-4 mb-3 fw-bold'>Description</h5>
                <p className='text-secondary'>{desc}</p>
                <hr className='my-5' />
                <TourMap lat={13.0827} lng={80.2707} city={city} />
              </div>
            </div>
          </Col>
          <Col lg="4">
            <div className="booking__info border p-4 rounded sticky-top bg-white shadow-sm" style={{ top: '100px' }}>
              <h3 className='mb-0 fw-bold border-bottom pb-3'>${price} <span className='fs-6 text-muted fw-normal'>/person</span></h3>
              <div className="booking__form mt-4">
                <Form onSubmit={handleBookingClick}>
                  <FormGroup><input type="text" placeholder="Full Name" id="fullName" className='form-control' required onChange={handleChange} /></FormGroup>
                  <FormGroup><input type="number" placeholder="Phone" id="phone" className='form-control' required onChange={handleChange} /></FormGroup>
                  <FormGroup className='d-flex gap-2'>
                    <input type="date" id="bookAt" className='form-control' required onChange={handleChange} />
                    <input type="number" id="guestSize" className='form-control' min="1" required onChange={handleChange} value={credentials.guestSize} />
                  </FormGroup>
                  <ListGroup className='mt-4 bg-light p-3 rounded'>
                    <ListGroupItem className='border-0 bg-transparent d-flex justify-content-between'><span>Subtotal</span><span>${price * credentials.guestSize}</span></ListGroupItem>
                    <ListGroupItem className='border-0 bg-transparent d-flex justify-content-between fw-bold border-top mt-2'><span>Total</span><span>${totalAmount}</span></ListGroupItem>
                  </ListGroup>
                  <Button type="submit" className='btn primary__btn w-100 mt-4' style={{ background: '#faa935', border: 'none' }}>Confirm Booking Now</Button>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TourDetails;