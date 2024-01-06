const { Schema, model } = require('mongoose')


const courseSchema = new Schema({
    title: { type: String, required: true },
    instructor: { type: String, required: true },
    description: { type: String, required: true },
    // duration: { type: Number, required: true },
    duration: { type: Schema.Types.Mixed, required: true },
    price: { type: String, required: true },
    isPublished: { type: Boolean, default: true },
    trainingLevel: { type: String, required: true },
    isVideoMedium: { type: String, required: true },
    playlist: { type: [String], default: [] },
    created_at: { type: Date, default: Date.now },
    image : { type : String , default : "https://shortcourses.mcmaster.ca/app/uploads/2019/03/bg-ad-creative-1024x896.jpg"}
});



const Course = model('course', courseSchema)
module.exports = Course;