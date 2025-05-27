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
        const products = await Product.find()
            .populate("categoryId", "name")//1.key 2.project
            .populate("sellerId", "firstName email role")

        return res.status(200).json(
            {
                "success": true,
                "msg": "DAta  fetched",
                data: products
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

exports.updateProduct = async (req, res) => {
    const { name, price } = req.body
    const _id = req.params.id

    try {
        const product =await Product.updateOne(
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
