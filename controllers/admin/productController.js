const Product = require("../../models/Product")

exports.addProduct = async (req, res) => {
    const { name, price, categoryId, userId } = req.body

    try {
        const product = new Product(
            {
                name,
                price,
                categoryId,
                sellerId: userId
            }
        )

        await product.save()
        return res.status(200).json(
            {
                "success": true,
                "msg": "Product added",
                data: product
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

exports.getAllProduct = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "" } = req.query

        let filter={}

        if(search){
            filter.$or=[
                {name:{$regex:search,$options:'i'}}
            ];
        }

        const skip=(page-1)*limit



        const products = await Product.find(filter)
            .populate("categoryId", "name")//1.key 2.project
            .populate("sellerId", "firstName email role")
            .skip(skip)
            .limit(Number(limit))

        const total= await Product.countDocuments(filter)



        return res.status(200).json(
            {
                "success": true,
                "msg": "DAta  fetched",
                data: products,
                pagination:{
                    total,
                    page:Number(page),
                    limit:Number(limit),
                    totalPages:Math.ceil(total/limit)//ceil rounds number
                }// pagination metadata
            }
        )
    } catch (error) {
        console.log("getAllProduct",{
            message:error.message,
            stack:error.stack
        });
        return res.status(500).json(
            {
                "success": false,
                "message": "Server error"
            }
        )
    }
}

exports.updateProduct = async (req, res) => {
    const { name, price } = req.body
    const _id = req.params.id

    try {
        const product = await Product.updateOne(
            {
                "_id": _id
            },
            {
                $set: {
                    "name": name,
                    "price": price
                }
            }
        )
        return res.status(200).json(
            {
                "success": true,
                "msg": "Product updated",
                "data": product
            }
        )

    } catch (error) {
        console.log(error)
        return res.status(500).json(
            {
                "success": false,
                "message": "Server error"
            }
        )
    }
}
