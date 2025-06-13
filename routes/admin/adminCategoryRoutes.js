const express=require("express")
const router=express.Router()

const{addCategory, getCategory, getOneCategory, updateCategory, deleteOneCategory}=require("../../controllers/admin/categoryController")
const upload=require("../../middlewares/fileupload")

router.post(
    "/",
    // applying multer middleware will give file metadata in
    // req.file or req.files on rest of the fuction
    upload.single("image"),
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