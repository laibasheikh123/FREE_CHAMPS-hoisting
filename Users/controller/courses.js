require('dotenv').config()
const Course = require('../schema/courses');

const createCourses = async (req, res) => {
    // console.log(req.body)

    const { title, instructor, description, duration, price, trainingLevel, isVideoMedium, image } = req.body;

    try {
        await Course.create({ title, instructor, description, duration, price, trainingLevel, isVideoMedium, image })
        res.status(201).json({ message: 'Course created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getAllCourse = async (req, res) => {
    try {
        // Retrieve all courses from the database
        const courses = await Course.find();

        res.status(200).json({ courses });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getCourseById = async (req, res) => {
    const { courseId } = req.params;

    try {
        // Retrieve a course by its ID from the database
        const course = await Course.findById(courseId);

        if (!course) {
            // If no course is found, respond with a 404 status
            return res.status(404).json({ message: 'Course not found' });
        }

        // If the course is found, respond with a status of 200 and provide the course in the response
        res.status(200).json({ course });
    } catch (error) {
        // If there's an error during the retrieval process, respond with a status of 500 and an error message
        res.status(500).json({ message: error.message });
    }
};



const updateCourseById = async (req, res) => {
    const { courseId } = req.params;
    const updateData = req.body;

    try {
        const updatedCourse = await Course.findByIdAndUpdate(courseId, updateData, { new: true });
        res.status(200).json({ message: 'Course updated successfully', course: updatedCourse });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCourseById = async (req, res) => {
    const { courseId } = req.params;

    try {
        const deletedCourse = await Course.findByIdAndDelete(courseId);
        res.status(200).json({ message: 'Course deleted successfully', course: deletedCourse });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const getPublishedCourses = async (req, res) => {
    try {
        const publishedCourses = await Course.find({ isPublished: true });
        res.status(200).json({ courses: publishedCourses });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCoursesByDuration = async (req, res) => {
    const { duration } = req.params;

    try {
        const courses = await Course.find({ duration: duration });
        res.status(200).json({ courses });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const addVideos = async (req, res) => {
    const { _id, videoURL } = req.body;

    try {
        // Course ID ke basis par course dhoondhein
        const course = await Course.findById(_id);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Playlist field ko update karein aur naya videoURL add karein
        course.playlist.push(videoURL);

        // Updated course ko save karein
        await course.save();

        res.status(200).json({ message: 'Video playlist mein successfully add hua', course });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




module.exports = {
    createCourses,
    getAllCourse,
    getCourseById,
    updateCourseById,
    deleteCourseById,
    getPublishedCourses,
    getCoursesByDuration,
    addVideos

};



