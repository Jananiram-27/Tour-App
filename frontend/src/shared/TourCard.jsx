import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';

const TourCard = ({ tour }) => {
  const { _id, title, city, photo, price, featured, reviews } = tour;

  // Indha link dhaan Default Image (Padam varalana idhu varum)
  const defaultImage = "https://img.freepik.com/free-vector/travel-tourism-concept-with-landmarks_1025-104.jpg";

  return (
    <div className="tour__card">
      <Card className='shadow-sm border-0 pb-3'>
        <div className="tour__img">
          <img 
            src={photo ? photo : defaultImage} 
            alt="tour-img" 
            className="w-100" // CardImg badhila sadharana img tag use panrom for better control
            style={{height:'200px', objectFit:'cover', borderRadius: '5px 5px 0 0'}} 
            
            // MAGIC LINE: Photo error aana, udane default image-ai podum
            onError={(e) => {
                e.target.onerror = null; 
                e.target.src = defaultImage;
            }}
          />
          {featured && <span className='bg-warning text-white px-2 py-1 position-absolute top-0 end-0 m-2 rounded'>Featured</span>}
        </div>

        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between">
            <span className="tour__location d-flex align-items-center gap-1 text-muted">
              <i className="ri-map-pin-line"></i> {city}
            </span>
            <span className="tour__rating d-flex align-items-center gap-1">
              <i className="ri-star-fill text-warning"></i> <span>(Not Rated)</span>
            </span>
          </div>

          <h5 className="tour__title mt-3"><Link to={`/tours/${_id}`} className='text-decoration-none text-dark'>{title}</Link></h5>

          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>${price} <span className="text-muted fs-6">/per person</span></h5>
            <button className="btn btn-warning booking__btn">
              <Link to={`/tours/${_id}`} className='text-white text-decoration-none'>Book Now</Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TourCard;