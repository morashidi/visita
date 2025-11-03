import appointmentModel from '../models/appointment.js';
import doctorModel from '../models/doctor.js';
import moment from 'moment';
const createAppointment = async (appointmentData) => {
	const {doctor: doctorId, time} = appointmentData;
	const isTaken = await appointmentModel.findOne({
		doctor: doctorId,
		time: time,
	});
	
	if (isTaken) {
		throw new Error('الموعد محجوز بالفعل');
	}

	let doctor = await doctorModel.findOne({ _id: doctorId });
	
	if (!doctor) {
		throw new Error('الطبيب غير موجود');
	}

	doctor = doctor.toObject();
	const isAvailableDay = doctor.availableDays.includes(moment(time).format('dddd'));
	const isAvailableTime = doctor.availableTimes.includes(moment(time).format('HH:mm'));
	if (!isAvailableDay || !isAvailableTime) {
		throw new Error('الطبيب غير متاح في هذا اليوم');
	}

	const createdAppointment = await appointmentModel.create(appointmentData);
	const appointment = await appointmentModel.findById(createdAppointment._id).populate('doctor');
	return appointment;
}

const getAppointments = async (userId) => {
	const appointments = await appointmentModel.find({ user: userId }).populate('doctor');
	return appointments;
}

export { createAppointment, getAppointments };