// validate jsonwebtoken
import jwt from 'jsonwebtoken';
import userModel from '../models/user.js';

const validateToken = async (req, res, next) => {
	try {
	const token = req.headers.authorization?.split(' ')[1];
	if (!token) {
		return res.status(401).json({ error: 'Unauthorized' });
	}
	const decoded = jwt.verify(token, process.env.JWT_SECRET);
	if (!decoded) {
		return res.status(401).json({ error: 'Unauthorized' });
	}
	const user = await userModel.findById(decoded.userId);
	if (!user) {
		return res.status(401).json({ error: 'Unauthorized' });
	}
	req.userId = decoded.userId;
	req.username = decoded.username;
	next();
	} catch (error) {
		next(error);
	}
}

export default validateToken;