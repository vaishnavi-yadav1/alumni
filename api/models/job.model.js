import mongoose from "mongoose";

const jobSchema=new mongoose.Schema({
    title:{type:String,required:true},
    company: { type: String, required: true },
  package: { type: Number, required: true },
  workType: { type: String, enum: ["Remote", "On-site", "Hybrid"], required: true },
  experience: { type: Number, required: true },
  location: { type: String, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Job=mongoose.model("Job",jobSchema);
export default Job;