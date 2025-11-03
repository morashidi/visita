import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/user.js';
import visitRoutes from './routes/visit.js';
import doctorRoutes from './routes/doctor.js';
import appointmentRoutes from './routes/appointment.js';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();
connectDB(); 

const app = express();
app.use(express.json()); 

app.use('/api/users', userRoutes);
app.use('/api/visits', visitRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const swaggerDocument = yaml.load(fs.readFileSync(path.join(__dirname, 'routes', 'docs.yaml'), 'utf8'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${3000}`);
});
