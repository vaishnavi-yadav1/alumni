import mongoose from'mongoose';

const jobSchema= new mongoose.Schema(
    {
        position:{
            type:String,
            required:true,
        },
        company:{
            type:String,
            required:true,
        },
        experience:{
            type:Number,
            required:true,
        },
        salary:{
            type:Number,
            required:true,
        },
        location:{
            type:String,
            required:true,
        },
        workType:{
            type:String,
            required:true,
        },
        userRef:{
            type:String,
            required:true,
        },
    },{timestamps:true}
)

const Job=mongoose.model('Job',jobSchema);
export default Job;