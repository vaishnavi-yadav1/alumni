import Job from "../models/job.model.js";
export const createJob = async (req, res, next) => {
    try {
        const { title, company, package: salary, workType, experience, location } = req.body;
        if (!title || !company || !salary || !workType || !experience || !location) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newJob = new Job({
            title,
            company,
            package: salary,
            workType,
            experience,
            location,
            postedBy: req.user._id,
        });
        await newJob.save();
        res.status(201).json({ message: "Job posted successfully", job: newJob });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getJobs = async (req, res, next) => {

};