import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "", // undefined vendaam, empty string nalladhu
    password: "",
  });

  const navigate = useNavigate();
  const loginImg = "https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg";
  const userIcon = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("Login Button Clicked!", credentials); // Console check

    try {
      const res = await fetch(`http://localhost:8000/api/v1/auth/login`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const result = await res.json();
      console.log("Server Response:", result);

      if (!res.ok) return alert(result.message);

      // Login Success
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.data));

      alert("Login Successful!");
      navigate('/home');

    } catch (err) {
      console.error(err);
      alert("Something went wrong! Check Console.");
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Login</h2>

                {/* Standard HTML Form & Button used here */}
                <form onSubmit={handleClick}>
                  <div className="form-group mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      required
                      id="email"
                      onChange={handleChange}
                      value={credentials.email}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      required
                      id="password"
                      onChange={handleChange}
                      value={credentials.password}
                    />
                  </div>
                  <button type="submit" className="btn secondary__btn auth__btn">
                    Login
                  </button>
                </form>
                
                <p>
                  Don't have an account? <Link to="/register">Create</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;