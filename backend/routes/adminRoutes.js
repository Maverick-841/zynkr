import express from 'express';
import { 
    adminLogin, 
    getStats, 
    updateCandidateStatus, 
    addCompany, 
    getCompanies, 
    createMatch, 
    getMatches,
    getSmartMatches
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', adminLogin);
router.get('/stats', protect, admin, getStats);
router.put('/candidate/status', protect, admin, updateCandidateStatus);
router.post('/company', protect, admin, addCompany);
router.get('/companies', protect, admin, getCompanies);
router.post('/match', protect, admin, createMatch);
router.get('/matches', protect, admin, getMatches);
router.get('/smart-matches', protect, admin, getSmartMatches);

export default router;
