import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/testDB')
  .then(() => console.log('✅ Connected to MongoDB successfully'))
  .catch(err => console.error('❌ Connection failed:', err));

