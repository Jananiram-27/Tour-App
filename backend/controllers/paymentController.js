export const verifyPayment = async (req, res) => {
    const { amount, tourName } = req.body;

    try {
        // Dummy processing delay (Like real payment)
        setTimeout(() => {
            res.status(200).json({
                success: true,
                message: `Payment of $${amount} for ${tourName} is successful!`,
                transactionId: `TRX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
            });
        }, 2000); 

    } catch (error) {
        res.status(500).json({ success: false, message: "Payment Failed" });
    }
};