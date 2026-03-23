import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'reactstrap';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const user = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(!user) return alert("Please login to give feedback!");

    // Pudhu feedback object
    const newFeedback = {
      name: user.username,
      text: reviewText,
      rating: rating
    };

    // LocalStorage-la irukura reviews-ai eduthu pudhusu add panrom
    const existingReviews = JSON.parse(localStorage.getItem('userReviews')) || [];
    existingReviews.push(newFeedback);
    localStorage.setItem('userReviews', JSON.stringify(existingReviews));

    alert("Thank you! Your feedback is now live on the Home Page.");
    setReviewText("");
    setRating(0);
  };

  return (
    <section className='pt-5'>
      <Container>
        <Row className='justify-content-center'>
          <Col lg='6' className='text-center border p-5 rounded shadow-sm bg-white'>
            <h2 className='mb-4'>Share Your Experience</h2>
            <p>Welcome, <span className='text-warning fw-bold'>{user?.username || 'Traveler'}</span>!</p>
            
            <Form onSubmit={handleSubmit}>
               <div className='d-flex justify-content-center gap-3 mb-4'>
                 {[1,2,3,4,5].map(num => (
                   <span key={num} onClick={() => setRating(num)} style={{cursor:'pointer', fontSize:'2rem', color: rating >= num ? '#faa935' : '#ccc'}}>
                     <i className="ri-star-fill"></i>
                   </span>
                 ))}
               </div>

               <textarea 
                  placeholder='Write your feedback here...' 
                  className='form-control mb-3' 
                  rows='4' 
                  value={reviewText}
                  onChange={(e)=> setReviewText(e.target.value)}
                  required 
               ></textarea>
               <Button type="submit" className='btn primary__btn w-100' style={{background:'#faa935', border:'none'}}>Submit Feedback</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Feedback;