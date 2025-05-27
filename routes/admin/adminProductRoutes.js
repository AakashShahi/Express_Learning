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

router.put(
    "/:id",
    productController.updateProduct
)

module.exports=router