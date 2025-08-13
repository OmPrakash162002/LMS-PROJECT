import mongoose from "mongoose";

const courseProgessSchema = new mongoose.Schema({
    userId : {type : String, require: true},
    courseId : {type:String, required : true},
    completed : {type:Boolean, default: false},
    lectureCompleted : []
},{minimize : false});

export const CourseProgress = mongoose.model('CourseProgress', courseProgessSchema)