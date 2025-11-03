import express from 'express';
const router = express.Router();
import { createDoctor, getDoctors } from '../services/doctor.js';

router.post('/', async (req, res) => {
	const { name, specialization, address, availableDays, availableTimes } = req.body;
	const doctor = await createDoctor({ name, specialization, address, availableDays, availableTimes });
	res.status(201).json(doctor);
})
.get('/', async (req, res) => {
	const doctors = await getDoctors();
	res.status(200).json(doctors);
})

export default router;