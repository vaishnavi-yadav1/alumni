import mongoose from "mongoose";

const alumniSchema= new mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        graduationYear:{type:Number,required:true},
        password: { type: String, required: true },
        department:{type:String,required:true},
        currentJob:{type:String},
        company:{type:String},
        industry:{type:String},
       
        experience:{type:Number,required:true},
    

    },
    {timestamps:true}
);

const Alumni=mongoose.model('Alumni',alumniSchema);
export default Alumni;