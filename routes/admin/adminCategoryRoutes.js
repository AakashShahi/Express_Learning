const express=require("express")
const router=express.Router()

const{addCategory, getCategory, getOneCategory, updateCategory, deleteOneCategory}=require("../../controllers/admin/categoryController")

router.post(
    "/",
    addCategory
)

router.get(
    "/",
    getCategory
)

router.get(
    "/:id",
    getOneCategory
)

router.put(
    "/:id",
    updateCategory
)

router.delete(
    "/:id",
    deleteOneCategory
)

module.exports=router