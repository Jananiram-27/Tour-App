import React, { useEffect, useRef } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import "../../styles/header.css";

// Feedback link added here
const nav__links = [
  { path: '/home', display: 'Home' },
  { path: '/about', display: 'About' },
  { path: '/tours', display: 'Tours' },
  { path: '/feedback', display: 'Feedback' }, 
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  const toggleMenu = () => menuRef.current.classList.toggle('show__menu');

  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current?.classList.add('sticky__header');
      } else {
        headerRef.current?.classList.remove('sticky__header');
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener('scroll', stickyHeaderFunc);
  });

  const logout = () => {
    localStorage.clear();
    navigate('/home');
    window.location.reload();
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            
            {/* LOGO */}
            <div className="logo">
              <Link to="/home" style={{textDecoration:'none'}}>
                <h2 style={{ 
                  margin: 0, 
                  fontWeight: '800', 
                  color: '#0b2727', 
                  fontSize: '1.5rem',
                  letterSpacing: '1px'
                }}>
                  TRAVEL<span style={{color:'#faa935'}}>WORLD</span>
                </h2>
              </Link>
            </div>

            {/* NAVIGATION MENU */}
            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <ul className="menu d-flex align-items-center gap-5" style={{listStyle:'none', marginBottom:0}}>
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink to={item.path} className={navClass => navClass.isActive ? 'active__link' : ''} style={{textDecoration:'none'}}>
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT SIDE */}
            <div className="nav__right d-flex align-items-center gap-4">
              <div className="nav__btns d-flex align-items-center gap-2">
                {user ? (
                  <>
                    <h5 className='mb-0 text-warning' style={{fontSize:'1rem', fontWeight:'700', textTransform:'capitalize'}}>{user.username}</h5>
                    <Button className="btn btn-dark btn-sm" onClick={logout}>Logout</Button>
                  </>
                ) : (
                  <>
                    <Button className="btn secondary__btn" style={{background:'transparent', border:'1px solid #faa935'}}>
                      <Link to='/login' className='text-decoration-none' style={{color: '#0b2727', fontWeight:'600'}}>Login</Link>
                    </Button>
                    <Button className="btn primary__btn" style={{background:'#faa935', border:'none'}}>
                      <Link to='/register' className='text-decoration-none' style={{color: '#fff', fontWeight:'600'}}>Register</Link>
                    </Button>
                  </>
                )}
              </div>

              <span className="mobile__menu" onClick={toggleMenu}>
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;