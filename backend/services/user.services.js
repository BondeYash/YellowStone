import userModel from '../models/user.model.js';

export const createUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  const hashedPassword = await userModel.hashPassword(password);

  const user = new userModel({
    email,
    password: hashedPassword,
  });

  await user.save(); // ✅ Save to DB

  return user; // Return saved user
};

export const getAllUser = async ({userId}) => {
  try {
    const user = await userModel.find({
      _id: { $ne : userId},
    });
    return user;
  }catch (err){
    
  }
}

