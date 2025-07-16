// ✅ controllers/applicantController.js
const Applicant = require('../models/Applicant');

exports.getApplicants = async (req, res) => {
  const applicants = await Applicant.find().sort({ createdAt: -1 });
  res.json(applicants);
};

exports.addApplicant = async (req, res) => {
  const { name } = req.body;
  const newApp = new Applicant({ name });
  await newApp.save();
  res.status(201).json(newApp);
};

exports.deleteApplicant = async (req, res) => {
  await Applicant.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};