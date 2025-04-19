import Job from "../models/job.model.js";
import errorHandler from "../utils/error.js";
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

  export const deleteListing = async (req, res, next) => {
    const listing = await Job.findById(req.params.id);
  
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
  
    if (req.user.id !== listing.userRef) {
      return next(errorHandler(401, 'You can only delete your own listings!'));
    }
  
    try {
      await Job.findByIdAndDelete(req.params.id);
      res.status(200).json('Listing has been deleted!');
    } catch (error) {
      next(error);
    }
  };
  