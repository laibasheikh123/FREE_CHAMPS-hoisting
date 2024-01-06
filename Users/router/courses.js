const express = require('express')
const router = express.Router()

const { createCourses, addVideos, getAllCourse, getCourseById, updateCourseById, deleteCourseById, getPublishedCourses, getCoursesByDuration } = require('../controller/courses')




router.post('/create-courses', createCourses);
router.post('/add-videos', addVideos);

router.get('/get-all-courses', getAllCourse);
router.get('/course-by-id/:courseId', getCourseById);
router.put('/update/:courseId', updateCourseById);
router.delete('/delete/:courseId', deleteCourseById);
router.get('/published', getPublishedCourses);
router.get('/duration/:duration', getCoursesByDuration);


module.exports = router;
