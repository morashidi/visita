import visitModel from '../models/visit.js';

const createVisit = async (visitData) => {
	const visit = await visitModel.create(visitData);
	return visit;
}

const getVisits = async (userId) => {
	const visits = await visitModel.find({ user: userId });
	return visits;
}

export { createVisit, getVisits };