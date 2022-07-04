import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    userName: String,
    userEmail: String,
    password: String,
    role: String,
    userId: String
})

var Users = mongoose.model('Users', userSchema);

export default Users;