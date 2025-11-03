import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	doctor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Doctor',
		required: true
	},
	time: {
		type: Date,
		required: true
	},
	notes: {
		type: String,
	},
	status: {
		type: String,
		enum: ['PENDING', 'CONFIRMED', 'CANCELLED'],
		default: 'PENDING'
	},
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;