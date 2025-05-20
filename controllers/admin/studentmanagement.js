const Student = require("../../models/Student")
const bcrypt = require("bcrypt")
const { findOne } = require("../../models/User")

//Create
exports.createStudents = async (req, res) => {
    const { stu_id, stu_name, stu_email } = req.body
    if (!stu_id || !stu_name || !stu_email) {
        return res.status(400).json(
            {
                "success": false,
                "message": "Missing Field"
            }
        )
    }
    try {
        const existingStudent = await Student.findOne(
            {
                $or: [{ stu_id: stu_id }, { stu_email: stu_email }]
            }
        )

        if (existingStudent) {
            return res.status(400).json(
                {
                    "success": false, "msg": "Student exists"
                }
            )
        }

        const newStudent = new Student(
            {
                stu_id: stu_id,
                stu_name: stu_name,
                stu_email: stu_email
            }
        )

        await newStudent.save()
        return res.status(201).json(
            {
                "success": true,
                "msg": "Student registered"
            }
        )


    } catch (e) {
        return res.status(500).json(
            {
                "success": false,
                "message": "Server error"
            }
        )

    }
}

exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find()
        return res.status(200).json(
            {
                "success": true,
                "message": "User data found",
                "data": students
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                "success": false,
                "message": "Server Error"
            }
        )
    }
}

exports.getOneStudent = async (req, res) => {
    try {
        const _id = req.params.id
        const student = await Student.findOne({ stu_id: _id })
        return res.status(200).json(
            {
                "success": true,
                "message": "One Student found",
                "data": student
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                "success": false,
                "message": "Server Error"
            }
        )

    }
}

exports.updateStudent = async (req, res) => {
    const { stu_name } = req.body
    const _id = req.params.id
    try {
        const student = await Student.updateOne(
            {
                stu_id: _id
            },
            {
                $set: {
                    stu_name: stu_name
                }
            }
        )

        return res.status(200).json(
            {
                "success": true,
                "message": "Updated"
            }
        )

    } catch (error) {
        return res.status(500).json(
            {
                "success": false,
                "message": "Server Error"
            }
        )
    }
}

exports.deleteStudent = async (req, res) => {
    const _id = req.params.id
    try {
        const student = await Student.deleteOne(
            {
                "stu_id": _id
            }
        )
        return res.status(200).json(
            {
                "success": true,
                "message": "Student Deleted"
            }
        )


    } catch (error) {
         return res.status(500).json(
            {
                "success": false,
                "message": "Server Error"
            }
        )
    }
}