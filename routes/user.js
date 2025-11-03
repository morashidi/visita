import express from 'express';
import Joi from 'joi';
const router = express.Router();
import { registerUser, loginUser } from '../services/user.js';

router.post('/register', 
	async (req, res) => {
	const { username, phone, password } = req.body;
	try {
		const validationResult = Joi.object({
			username: Joi.string().min(5).max(30).required().messages({
				'string.min': 'اسم المستخدم يجب أن يكون على الأقل 5 أحرف !',
				'string.max': 'اسم المستخدم يجب أن يكون على الأقل 30 أحرف !',
			}),
			phone: Joi.string().regex(/^(00966|966|\+966|0)([0-9]{9})$/).required().messages({
				'string.pattern.base': 'رقم الهاتف غير صحيح !',
			}),
			password: Joi.string().required().min(6).messages({
				'string.min': 'كلمة المرور يجب أن تكون على الأقل 6 أحرف !',
			}),
		}).validate({ username, phone, password });
		if (validationResult.error) {
			return res.status(400).json({ error: validationResult.error.message });
		}
		const user = await registerUser({ username, phone, password });
		res.status(201).json(user);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.post('/login', async (req, res) => {
	try {
		const { username, password } = req.body;
		const { token, user } = await loginUser({ username, password });
		res.status(200).json({ token, user });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

export default router;