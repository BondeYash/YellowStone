import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  
    email : {
        type :  String,
        required: true,
        unique : true,
        lowercase : true,
        trim : true,
        maxLength : 50,
        minLength : [5 , "Email must be atleast 5 characters long"]
    },
    password : {
        type : String,
        select : false,
        required : true,
        
    },
    
})

userSchema.statics.hashPassword = async (password)=>{
    return await bcrypt.hash(password , 10)
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ email: this.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

const User = mongoose.model('User', userSchema);

export default User;