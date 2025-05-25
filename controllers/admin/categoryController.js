const Category=require("../../models/Category")

exports.addCategory=async(req,res)=>{
    const {name}=req.body
    const existingCategory= await Category.findOne(
        {name:name}
    )

    if(existingCategory){
        return res.status(400).json(
            {
                "success": false, "msg": "Category already exists"
            }
        )
    }

    const newCategory=new Category(
        {
            name:name
        }
    )

    await newCategory.save()

    res.status(201).json(
        {
             "success": true,
            "msg": "Category added"
        }

    )
}

exports.getCategory=async (req,res)=>{
    try {
        const categoriess= await Category.find()
        return res.status(200).json(
            {
                "success": true,
                "message": "Category Found",
                "data": categoriess
            }
        )
    } catch (error) {
         return res.status(500).json(
            {
                "success": false,
                "message": "Server Error"
            }
        )
    }
}

exports.getOneCategory=async (req,res)=>{
    try {
        const _id=req.params.id
        const category=await Category.findById(_id)
         return res.status(200).json(
            {
                "success": true,
                "message": "One Category Found",
                "data": category
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

exports.updateCategory=async (req,res) => {
    const {name}=req.body
    const _id=req.params.id

    try {
        const category= await Category.updateOne(
            {
                "_id":_id
            },
            {
                $set:{
                    "name":name,
                }
            }
        )

         return res.status(200).json(
            {
                "success": true,
                "message": "One Category Updated",
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

exports.deleteOneCategory= async(req,res)=>{
    try {
        const _id=req.params.id
        const category=await Category.deleteOne(
            {
                "_id":_id
            }
        )
        return res.status(200).json(
            {
                "success": true,
                "message": "One Category deleted",
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
