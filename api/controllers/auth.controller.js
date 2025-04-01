import Alumni from "../models/alumni.model.js";
import bcryptjs from 'bcryptjs'
import errorHandler  from "../utils/error.js";
import jwt from 'jsonwebtoken'; 

export const signup = async (req, res, next) => {
    try {
        const {
            name,
            email,
            password,
            graduationYear,
            department,
            currentJob,
            company,
            industry,  
            experience
        } = req.body;

        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newAlumni = new Alumni({
            name,
            email,
            password: hashedPassword,
            graduationYear,
            department,
            currentJob,
            company,
            industry,
            experience

        });

        await newAlumni.save();
        res.status(201).json("User created successfully!");
    } catch (error) {
        next(error);
    }
};

export const signin= async (req,res,next)=>{
    const {email,password}=req.body;
    try{
     const validUser= await Alumni.findOne({email});
     if(!validUser) return next(errorHandler(404,'User not found'));
     const validPassword=bcryptjs.compareSync(password,validUser.password);
     if(!validPassword) return next(errorHandler(401,'Wrong credentials'));
     const token=jwt.sign({id: validUser._id},process.env.JWT_SECRET)
     const {password: pass, ...rest}=validUser._doc;
     res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)
    }catch(error){
        next(error);
    }
}