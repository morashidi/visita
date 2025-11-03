import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	specialization: {
		type: String,
	},
	address: {
		type: String,
	},
	availableDays: {
		type: [String],
	},
	availableTimes: {
		type: [String],
	},
});

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;