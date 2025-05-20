const mongoose=require("mongoose")

const StudentSchema=new mongoose.Schema(
    {
        stu_id:{
            type:String,
            required:true,
            unique:true
        },
        stu_name:{
            type:String,
            required:true
        },
        stu_email:{
            type:String,
            required:true,
            unique:true
        }
    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model(
    "Student",StudentSchema
)