import Alumni from "../models/alumni.model.js";
import bcryptjs from 'bcryptjs'

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
