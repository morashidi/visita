import userModel from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const getUser = async (userId) => {
	const user = await userModel.findById(userId);
	return user;
}

const registerUser = async (userData) => {
	const findUser = await userModel.findOne({ username: userData.username });
	if (findUser) {
		throw new Error('المستخدم موجود بالفعل');
	}
	const hashedPassword = await bcrypt.hash(userData.password, 10);
	userData.password = hashedPassword;
	let user = await userModel.create(userData);
	user = user.toObject();
	delete user.password;
	return user;
}

const loginUser = async (userData) => {
	const user = await userModel.findOne({ username: userData.username });
	if (!user) {
		throw new Error('المستخدم غير موجود');
	}

	const passwordMatch = await bcrypt.compare(userData.password, user.password);
	if (!passwordMatch) {
		throw new Error('اسم المستخدم او كلمة المرور غير صحيحة');
	}

	const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET);
	
	delete user.password;

	return { token, user };
}


export { getUser, loginUser, registerUser };