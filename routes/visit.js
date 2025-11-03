import express from 'express';
const router = express.Router();
import validateToken from './middlewares.js';
import Joi from 'joi';
import { createVisit, getVisits } from '../services/visit.js';

router.post('/', validateToken, async (req, res) => {
	const { type, reason, symptomsDate, specialCondition, serviceType, interval, patientType, date, address, location, notes } = req.body;
	try {
		const validationResult = Joi.object({
			type: Joi.string().required().valid('DOCTOR', 'NURSE'),
			reason: Joi.string().required(),
			symptomsDate: Joi.string().required().valid('LESS_ONE_DAY', 'DAY_TO_THREE_DAYS', 'FOUR_TO_SEVEN_DAYS', 'MORE_THAN_SEVEN_DAYS'),
			specialCondition: Joi.string().required().valid('CHRONIC', 'RECENT_SURGERY_OR_DISCHARGED', 'MEDICATION_ADHERENCE', 'OTHER'),
			serviceType: Joi.string().required().valid('MEDICATIONS', 'PHYSICAL_TREATMENT', 'IV_OR_CATHETER', 'VITALS_CHECKUP', 'OTHER'),
			interval: Joi.string().required().valid('ONCE','COUPLE_OF_TIMES', 'WEEKLY', 'NOT_SURE'),
			patientType: Joi.string().required().valid('ME', 'FAMILY_MEMBER', 'CHILD', 'ELDERLY'),
			date: Joi.date().required(),
			address: Joi.string().required(),
			location: Joi.object({
				type: Joi.string().required(),
				coordinates: Joi.array().items(Joi.number()).required(),
			}),
			notes: Joi.string().required(),
		}).validate({ type, reason, symptomsDate, specialCondition, serviceType, interval, patientType, date, address, location, notes });
		if (validationResult.error) {
			return res.status(400).json({ error: validationResult.error.message });
		}
		const visit = await createVisit({ user: req.userId, type, reason, symptomsDate, specialCondition, serviceType, interval, patientType, date, address, location, notes });
		res.status(201).json(visit);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
})
.get('/mine', validateToken, async (req, res) => {
	try {
		const visits = await getVisits(req.userId);
		res.status(200).json(visits);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
})

export default router;