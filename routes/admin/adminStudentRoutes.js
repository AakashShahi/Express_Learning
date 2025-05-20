const express=require("express")
const router=express.Router()

const{createStudents, getStudents, getOneStudent, updateStudent, deleteStudent}=require("../../controllers/admin/studentmanagement")

router.post(
    "/create",
    createStudents
)

router.get(
    "/",
    getStudents
)

router.get(
    "/:id",
    getOneStudent
)

router.put(
    "/:id",
    updateStudent
)

router.delete(
    "/:id",
    deleteStudent
)


module.exports=router