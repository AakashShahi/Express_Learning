const express=require("express")
const router=express.Router()

const {createUsers,getUsers,getOneUser,updateOneUser,deleteOneUser}=require("../../controllers/admin/usermanagement")
router.post(
    "/create",
    createUsers
)

router.get(
    "/",
    getUsers
)

 router.get(
    "/:id",// req.params.id
    getOneUser
 )

 router.put(
    "/:id",
    updateOneUser
 )

 router.delete(
    "/:id",
    deleteOneUser
 )
 
  module.exports=router