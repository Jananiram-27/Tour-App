import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/thank-you.css'; 

// 1. Library Import
import jsPDF from 'jspdf';
import QRCode from 'qrcode';

const ThankYou = () => {

  // --- 2. PDF GENERATION LOGIC ---
  const generatePDF = async () => {
    // PDF Object create panrom
    const doc = new jsPDF();
    
    // --- DESIGN START ---

    // A. Header Section (Orange Background)
    doc.setFillColor(250, 169, 53); // TravelWorld Orange Color
    doc.rect(0, 0, 210, 40, 'F');   // Rectange box
    
    // Title Text
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255); // White Text
    doc.text("TRAVEL WORLD", 105, 20, null, null, "center");
    doc.setFontSize(12);
    doc.text("Your Journey Begins Here", 105, 30, null, null, "center");

    // B. Booking Details Section
    doc.setTextColor(0, 0, 0); // Black Text
    doc.setFontSize(16);
    doc.text("E-TICKET / BOOKING CONFIRMATION", 20, 60);
    
    // Line Draw panrom
    doc.setLineWidth(0.5);
    doc.line(20, 65, 190, 65);

    // Ticket Details
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50); // Grey Text
    
    // Random Booking ID & Date create panrom
    const bookingID = "TW-" + Math.floor(100000 + Math.random() * 900000);
    const date = new Date().toLocaleDateString();

    doc.text(`Booking ID: ${bookingID}`, 20, 80);
    doc.text(`Date of Issue: ${date}`, 20, 90);
    doc.text(`Status: Confirmed & Paid`, 20, 100);
    doc.text(`Passenger: Verified Traveler`, 20, 110);

    // C. QR Code Generation Logic
    try {
      // Indha text dhaan QR Code-ah maarum
      const qrData = `Ticket Verified: ${bookingID} | TravelWorld Official`;
      
      // Text -> Image conversion
      const qrCodeDataUri = await QRCode.toDataURL(qrData);
      
      // PDF-la Image add panrom (x, y, width, height)
      doc.addImage(qrCodeDataUri, 'PNG', 150, 70, 40, 40);
      
      doc.setFontSize(10);
      doc.text("Scan to Verify", 157, 115);
    } catch (err) {
      console.error("QR Code Error:", err);
    }

    // D. Footer Instruction
    doc.setDrawColor(250, 169, 53); // Orange Border
    doc.rect(15, 130, 180, 30); // Box for instruction
    
    doc.setFontSize(11);
    doc.setTextColor(255, 100, 0); // Orange Text
    doc.text("IMPORTANT INSTRUCTION:", 20, 140);
    
    doc.setTextColor(0, 0, 0); // Black Text
    doc.setFontSize(10);
    doc.text("Please show this QR code at the entrance. Happy Traveling!", 20, 150);

    // --- 3. SAVE & DOWNLOAD ---
    doc.save(`TravelWorld_Ticket_${bookingID}.pdf`);
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg='12' className='pt-5 text-center'>
            <div className="thank__you">
              <span><i className="ri-checkbox-circle-line" style={{fontSize: '5rem', color: '#faa935'}}></i></span>
              <h1 className='mb-3 fw-semibold'>Thank You!</h1>
              <h3 className='mb-4'>Your tour is booked successfully.</h3>

              <div className='d-flex justify-content-center gap-3 mt-4'>
                <Button className='btn primary__btn w-25'>
                  <Link to='/home' style={{textDecoration:'none', color:'#fff'}}>Back to Home</Link>
                </Button>
                
                {/* 4. NEW BUTTON: DOWNLOAD TICKET */}
                <Button 
                  onClick={generatePDF}
                  className='btn btn-dark w-25 d-flex align-items-center justify-content-center gap-2'
                  style={{ backgroundColor: '#0b2727', border: 'none' }}
                >
                  <i className="ri-file-download-line"></i> Download Ticket
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ThankYou;