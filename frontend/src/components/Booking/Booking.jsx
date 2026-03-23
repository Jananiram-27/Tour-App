import React, { useState } from 'react';
import './booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const Booking = ({ tour, avgRating }) => {
  const { price, reviews } = tour;
  const navigate = useNavigate();

  // Local storage-la irundhu user login panni irukara nu check panrom
  const user = JSON.parse(localStorage.getItem('user'));

  const [credentials, setCredentials] = useState({
    userId: user?._id || '',
    userEmail: user?.email || '',
    fullName: '',
    phone: '',
    guestSize: 1,
    bookAt: ''
  });

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const serviceFee = 10;
  const totalAmount = Number(price) * Number(credentials.guestSize) + Number(serviceFee);

  // SEND DATA TO FAKE STRIPE & THANK YOU PAGE
  const handleClick = e => {
    e.preventDefault();

    if (!user) {
      return alert("Please login to book your tour!");
    }

    // FAKE STRIPE FLOW
    alert("Redirecting to Secure Payment Gateway (Stripe)...");

    setTimeout(() => {
      alert("Payment Successful! Amount Paid: $" + totalAmount);
      navigate("/thank-you");
    }, 2000);
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>${price} <span>/per person</span></h3>
        <span className="tour__rating d-flex align-items-center">
          <i className="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/* BOOKING FORM */}
      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input type="text" placeholder="Full Name" id="fullName" required onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <input type="number" placeholder="Phone" id="phone" required onChange={handleChange} />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input type="date" id="bookAt" required onChange={handleChange} />
            <input type="number" placeholder="Guests" id="guestSize" required onChange={handleChange} />
          </FormGroup>
        </Form>
      </div>

      {/* BOOKING BOTTOM / PRICE SUMMARY */}
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">${price} <i className="ri-close-line"></i> 1 person</h5>
            <span>${price}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service charge</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>

        <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>Book Now</Button>
      </div>
    </div>
  );
};

export default Booking;