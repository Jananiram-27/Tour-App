import React, { useState } from 'react';
import './payment-modal.css'; // Chinna CSS venum

const PaymentModal = ({ amount, tourName, onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);

    const handlePay = () => {
        setLoading(true);
        // Backend-ku pathila dummy timeout
        setTimeout(() => {
            setLoading(false);
            onSuccess(); // Success message kaatta
        }, 3000);
    };

    return (
        <div className="modal-overlay">
            <div className="payment-card">
                <h3>Payment for {tourName}</h3>
                <p className="amount-text">Total: <strong>${amount}</strong></p>
                
                {!loading ? (
                    <div className="options">
                        <button onClick={handlePay} className="pay-btn upi">Pay via GPay / PhonePe</button>
                        <button onClick={handlePay} className="pay-btn card">Pay via Debit/Credit Card</button>
                    </div>
                ) : (
                    <div className="loader-container">
                        <div className="spinner"></div>
                        <p>Processing Secure Payment...</p>
                    </div>
                )}
                
                <button onClick={onClose} className="close-link">Cancel</button>
            </div>
        </div>
    );
};

export default PaymentModal;