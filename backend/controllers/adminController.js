import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Company from '../models/Company.js';
import Match from '../models/Match.js';

// @desc    Admin login (Hardcoded)
// @route   POST /api/admin/login
// @access  Public
export const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    if (email === 'admin@zynkr.com' && password === 'admin123') {
        const token = jwt.sign({ id: 'admin_id', role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.json({
            _id: 'admin_id',
            name: 'Zynkr Admin',
            email: 'admin@zynkr.com',
            role: 'admin',
            token
        });
    } else {
        res.status(401).json({ message: 'Invalid admin credentials' });
    }
};

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getStats = async (req, res) => {
    try {
        const totalCandidates = await User.countDocuments({ role: 'candidate' });
        const shortlistedCandidates = await User.countDocuments({ 'profile.status': 'shortlisted' });
        const totalCompanies = await Company.countDocuments();
        const activeMatches = await Match.countDocuments();

        res.json({
            totalCandidates,
            shortlistedCandidates,
            totalCompanies,
            activeMatches
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update candidate status
// @route   PUT /api/admin/candidate/status
// @access  Private/Admin
export const updateCandidateStatus = async (req, res) => {
    const { id, status } = req.body;
    try {
        const user = await User.findById(id);
        if (user) {
            user.profile.status = status;
            await user.save();
            res.json({ message: `Candidate status updated to ${status}` });
        } else {
            res.status(404).json({ message: 'Candidate not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a company
// @route   POST /api/admin/company
// @access  Private/Admin
export const addCompany = async (req, res) => {
    try {
        const company = await Company.create(req.body);
        res.status(201).json(company);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all companies
// @route   GET /api/admin/companies
// @access  Private/Admin
export const getCompanies = async (req, res) => {
    try {
        const companies = await Company.find({});
        res.json(companies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a match
// @route   POST /api/admin/match
// @access  Private/Admin
export const createMatch = async (req, res) => {
    const { candidate_ids, company_id } = req.body;
    try {
        const matches = await Promise.all(candidate_ids.map(id => 
            Match.create({ candidate_id: id, company_id, status: 'sent' })
        ));
        res.status(201).json(matches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all matches
// @route   GET /api/admin/matches
// @access  Private/Admin
export const getMatches = async (req, res) => {
    try {
        const matches = await Match.find({})
            .populate('candidate_id', 'name email profile.specialization')
            .populate('company_id', 'company_name role_hiring');
        res.json(matches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
