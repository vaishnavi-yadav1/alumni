import Job from "../models/job.model.js";

export const  createPost =async(req,res,next) =>{
try {
    const  job= await Job.create(req.body);
    return res.status(201).json(job);
} catch (error) {
    next(error);
}

};

export const getJobs = async (req, res, next) => {
    try {
      const jobs = await Job.find().sort({ createdAt: -1 });
      res.status(200).json(jobs);
    } catch (error) {
      next(error);
    }
  };
  