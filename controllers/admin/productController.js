const Product=require("../../models/Product")

exports.addProduct=async(req,res)=>{
    const{name,price,categoryId,userId}=req.body

    try {
        const product=new Product(
            {
                name,
                price,
                categoryId,
                sellerId:userId
            }
        )

        await product.save()
         return res.status(200).json(
            {
                "success": true,
                "msg": "Product added",
                data:product
            }
        )

    } catch (error) {
           return res.status(500).json(
            {
                "success": false,
                "message": "Server error"
            }
        )
    }
}

exports.getAllProduct =async (req,res)=>{
    try {
        const products=await Product.find()
        .populate("categoryId","name")//1.key 2.project
        .populate("sellerId","firstName email role")

         return res.status(200).json(
            {
                "success": true,
                "msg": "DAta  fetched",
                data:products
            }
        )
    } catch (error) {
         return res.status(500).json(
            {
                "success": false,
                "message": "Server error"
            }
        )
    }
}
