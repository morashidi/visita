import doctorModel from '../models/doctor.js';

const createDoctor = async (doctorData) => {
	const doctor = await doctorModel.create(doctorData);
	return doctor;
}

const getDoctors = async () => {
	const doctors = await doctorModel.find();
	return doctors;
}

export { createDoctor, getDoctors };