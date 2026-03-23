import React from 'react';

// Components Import
import Header from '../Header/Header';
import Footer from '../Footer/Footer'; // Footer serthu irukken
import Routers from '../../router/Routers';
import ChatBot from '../Chatbot/Chatbot'; // <--- Namathu AI ChatBot!

const Layout = () => {
  return (
    <>
      <Header />
      
      {/* Main Content */}
      <div className="container mt-4">
        <Routers />
      </div>

      {/* AI ChatBot (Floating Bubble) */}
      <ChatBot />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Layout;