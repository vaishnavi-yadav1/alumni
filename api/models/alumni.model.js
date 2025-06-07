import mongoose from "mongoose";

const alumniSchema= new mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        graduationYear:{type:Number,required:true},
        password: { type: String, required: true },
        branch:{type:String,required:true},
        currentJob:{type:String},
        company:{type:String},
        industry:{type:String},
        avatar:{
            type:String,
            default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        },
        experience:{type:Number},
    

    },
    {timestamps:true}
);

const Alumni=mongoose.model('Alumni',alumniSchema);
export default Alumni;