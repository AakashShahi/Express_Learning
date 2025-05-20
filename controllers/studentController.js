const Student=require("../models/Student")

exports.registerStudent=async(req,res)=>{
    const {stu_id,stu_name,stu_email}=req.body
    try {
        const existingStudent=await Student.findOne(
            {
                $or:[{stu_name:stu_name},{stu_email:stu_email}]
            }
        )

        if (existingStudent){
             return res.status(400).json(
                {
                    "success": false, "msg": "Student exists"
                }
            )
        }

        const newStudent=new Student(
            {
                stu_id:stu_id,
                stu_name:stu_name,
                stu_email:stu_email
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

exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find(); // Fetch all students
        return res.status(200).json({
            success: true,
            data: students
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};