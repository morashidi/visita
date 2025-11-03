import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	type: {
		type: String,
		required: true,
		enum: ['DOCTOR', 'NURSE']
	},
	reason: {
		type: String,
	},
	symptomsDate: {
		type: String,
		enum: ['LESS_ONE_DAY', 'DAY_TO_THREE_DAYS', 'FOUR_TO_SEVEN_DAYS', 'MORE_THAN_SEVEN_DAYS']
	},
	specialCondition: {
		type: String,
		enum: ['CHRONIC', 'RECENT_SURGERY_OR_DISCHARGED', 'MEDICATION_ADHERENCE', 'OTHER']
	},
	serviceType: {
		type: String,
		enum: ['MEDICATIONS', 'PHYSICAL_TREATMENT', 'IV_OR_CATHETER', 'VITALS_CHECKUP', 'OTHER']
	},
	interval: {
		type: String,
		enum: ['ONCE','COUPLE_OF_TIMES', 'WEEKLY', 'NOT_SURE']
	},
	patientType: {
		type: String,
		enum: ['ME', 'FAMILY_MEMBER', 'CHILD', 'ELDERLY']
	},
	date: {
		type: Date,
		required: true
	},
	address: {
		type: String,
	},
	location: {
		type: {
			type: String,
		},
		coordinates: {
			type: [Number],
		}
	},
	notes: {
		type: String,
	},
	
}, { timestamps: true });

const Visit = mongoose.model('Visit', visitSchema);

export default Visit;
