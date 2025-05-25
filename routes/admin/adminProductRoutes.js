const express=require("express")
const router=express.Router()

const productController=require("../../controllers/admin/productController")

router.post(
    "/",
    productController.addProduct
)

router.get(
    "/",
    productController.getAllProduct
)

module.exports=router