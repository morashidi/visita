
🏥 Medical Service Platform

A secure and scalable medical application that allows patients to register, book appointments, and request home medical visits with doctors or nurses. The system is designed with strong validation, authentication, and role-based access control.


---

🚀 Features

🔐 Authentication & Security

User Registration with strict validation

Unique constraints on:

Email

Phone Number


Phone number validation based on country-specific formats

Secure password hashing using crypto

User Login system with authentication



---

🏠 Home Visit Service

Choose between:

Doctor 👨‍⚕️

Nurse 👩‍⚕️


Dynamic form based on selection:

Symptoms questions

Pain level (1–100)

Duration of illness


Optional Notes:

e.g. "Patient prefers female nurse"




---

📅 Appointment Booking

Filter doctors by specialization

View doctor profile & available slots

Real-time availability:

Booked slots are automatically removed


Easy booking flow



---

📜 Patient History

Access personal medical history

View:

Previous appointments

Doctors visited

Dates & details




---

🛠️ Admin Dashboard

Full control over system data:

Add Doctors

Delete Doctors

Manage appointments


Role-based access (Admin only)



---

🧠 Tech Stack

Backend: Node.js, Express.js

Database: MongoDB

Authentication: JWT

Security: Crypto (Password Hashing)

Validation: Custom Validation Logic



---

⚙️ Installation

git clone https://github.com/your-username/your-repo.git
cd your-repo
npm install


---

▶️ Running the App

npm run dev


---

📡 API Overview

Auth

POST /register

POST /login


Home Visit

POST /home-visit


Appointment

GET /doctors

POST /book-appointment


User

GET /my-history


Admin

POST /admin/create-doctor

DELETE /admin/delete-doctor/:id






 Notes

All sensitive data is handled securely

Scalable architecture for future features

Clean and modular code structure





👨‍💻 Author

Mohamed Rashidi
Backend Developer (Node.js)


