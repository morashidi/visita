import doctorModel from './models/doctor.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
	.then(() => console.log('✅ Connected to MongoDB successfully'))
	.catch(err => console.error('❌ Connection failed:', err));

// generate seed doctors
const seedDoctors = async () => {
	const doctors = await doctorModel.create([
		{ name: 'Dr. John Doe', specialization: 'Cardiologist', address: '123 Main St, Anytown, USA', availableDays: ['Monday', 'Wednesday', 'Friday'], availableTimes: ['10:00', '11:00', '12:00'] }
	]);
	console.log(`🌱 Seeded ${doctors.length} doctors`);
}

seedDoctors();