import express from 'express';
const router = express.Router();
import { createAppointment, getAppointments } from '../services/appointment.js';
import validateToken from './middlewares.js';
import Joi from 'joi';

router.post('/', validateToken, async (req, res) => {
	const { doctor, date, time, notes } = req.body;
	try {
		const validationResult = Joi.object({
			doctor: Joi.string().required(),
			time: Joi.date().iso().required(),
			notes: Joi.string(),
		}).validate({ doctor, time, notes });
		if (validationResult.error) {
			return res.status(400).json({ error: validationResult.error.message });
		}
		const appointment = await createAppointment({ user: req.userId, doctor, time, notes });
		res.status(201).json(appointment);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
})
.get('/mine', validateToken, async (req, res) => {
	const appointments = await getAppointments(req.userId);
	res.status(200).json(appointments);
})

export default router;