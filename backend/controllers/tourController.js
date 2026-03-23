import Tour from '../models/Tour.js';
import Review from '../models/Review.js'; // <--- INTHA LINE ROMBA MUKKIYAM! (Add this)

// 1. Create New Tour
export const createTour = async (req, res) => {
    const newTour = new Tour(req.body);
    try {
        const savedTour = await newTour.save();
        res.status(200).json({ success: true, message: "Successfully created", data: savedTour });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to create. Try again" });
    }
};

// 2. Update Tour
export const updateTour = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedTour = await Tour.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true });

        res.status(200).json({ success: true, message: "Successfully updated", data: updatedTour });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to update" });
    }
};

// 3. Delete Tour
export const deleteTour = async (req, res) => {
    const id = req.params.id;
    try {
        await Tour.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Successfully deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to delete" });
    }
};

// 4. Get Single Tour
export const getSingleTour = async (req, res) => {
    const id = req.params.id;
    try {
        // Inga Review populate panrapo issue varalam, athanalathaan mela import panninom
        const tour = await Tour.findById(id).populate("reviews"); 
        res.status(200).json({ success: true, message: "Success", data: tour });
    } catch (err) {
        res.status(404).json({ success: false, message: "Not found" });
    }
};

// 5. Get All Tours
export const getAllTour = async (req, res) => {
    try {
        const tours = await Tour.find({}).populate("reviews"); 
        res.status(200).json({ success: true, count: tours.length, message: "Successful", data: tours });
    } catch (err) {
        res.status(404).json({ success: false, message: "Not found" });
    }
};

// 6. Get Tour By Search (DEBUGGED VERSION) 🚀
export const getTourBySearch = async (req, res) => {
    const category = req.query.category;
    const city = req.query.city;

    try {
        let filter = {};

        if (category) {
            filter.category = new RegExp(category, 'i');
        }

        if (city) {
            filter.city = new RegExp(city, 'i');
        }

        // Ippo 'Review' model import aanadhala, intha .populate("reviews") work aagum!
        const tours = await Tour.find(filter).populate("reviews");

        console.log(`Searching for: ${JSON.stringify(filter)}`);
        console.log(`Found: ${tours.length} tours`);

        res.status(200).json({
            success: true,
            message: "Successful",
            data: tours
        });

    } catch (err) {
        console.error("Search Error:", err); 
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};