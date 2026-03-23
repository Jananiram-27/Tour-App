import express from 'express';
import { 
    createTour, 
    deleteTour, 
    getAllTour, 
    getSingleTour, 
    updateTour, 
    getTourBySearch 
} from '../controllers/tourController.js';

const router = express.Router();

// Specific routes first (Search eppovum mela irukkanum)
router.get("/getTourBySearch", getTourBySearch);

// General routes later
router.post('/', createTour);
router.get('/', getAllTour);
router.get('/:id', getSingleTour);
router.put('/:id', updateTour);
router.delete('/:id', deleteTour);

export default router;