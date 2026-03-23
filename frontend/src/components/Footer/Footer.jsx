import React from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../styles/footer.css'; // Next step la create pannuvom

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3">
            <div className="logo">
              {/* Logo Image irundha inga podalam, illana Text */}
              <h2 className="d-flex align-items-center gap-1">
                <i className="ri-suitcase-2-line" style={{color:'#faa935'}}></i> Travel World
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, enim.
              </p>
              <div className="social__links d-flex align-items-center gap-4">
                <span>
                  <Link to='#'><i className="ri-youtube-line"></i></Link>
                </span>
                <span>
                  <Link to='#'><i className="ri-github-fill"></i></Link>
                </span>
                <span>
                  <Link to='#'><i className="ri-facebook-circle-line"></i></Link>
                </span>
                <span>
                  <Link to='#'><i className="ri-instagram-line"></i></Link>
                </span>
              </div>
            </div>
          </Col>

          <Col lg="3">
            <h5 className="footer__link-title">Discover</h5>
            <ListGroup className="footer__quick-links">
              <ListGroupItem className="ps-0 border-0">
                <Link to='/home'>Home</Link>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0">
                <Link to='/about'>About</Link>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0">
                <Link to='/tours'>Tours</Link>
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col lg="3">
            <h5 className="footer__link-title">Quick Links</h5>
            <ListGroup className="footer__quick-links">
              <ListGroupItem className="ps-0 border-0">
                <Link to='/gallery'>Gallery</Link>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0">
                <Link to='/login'>Login</Link>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0">
                <Link to='/register'>Register</Link>
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col lg="3">
            <h5 className="footer__link-title">Contact</h5>
            <ListGroup className="footer__quick-links">
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span><i className="ri-map-pin-line"></i></span>
                  Address:
                </h6>
                <p className="mb-0">Chennai, India</p>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span><i className="ri-mail-line"></i></span>
                  Email:
                </h6>
                <p className="mb-0">janani@travelworld.com</p>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span><i className="ri-phone-fill"></i></span>
                  Phone:
                </h6>
                <p className="mb-0">+91 9876543210</p>
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col lg="12" className="text-center pt-5">
            <p className="copyright">Copyright {year}, design and develop by Janani R. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;