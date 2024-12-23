const mongoose = require('mongoose');
const { User } = require('./models/user.model');
const dotenv = require('dotenv');

dotenv.config();

const adminUserData = {
    username: process.env.ADMIN_USERNAME,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    role: "admin"
};

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(async () => {
        console.log('Connected to MongoDB');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: adminUserData.email });
        if (existingAdmin) {
            console.log('Admin user already exists.');
            return;
        }

        // Create new admin user
        const adminUser = new User(adminUserData);
        await adminUser.save();
        console.log('Admin user created successfully');
    })
    .catch(err => console.error('MongoDB connection error:', err))
    .finally(() => mongoose.disconnect());
