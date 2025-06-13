// CRUD
const User = require("../../models/User")
const bcrypt = require("bcrypt")

//Create
exports.createUsers = async (req, res) => {
    const { username, email, firstName, lastName, password, role } = req.body;
    //validation
    if (!username || !email || !firstName || !lastName || !password) {
        return res.status(400).json(
            {
                "success": false,
                "message": "Missing Field"
            }
        )
    }
    try {
        const existingUser = await User.findOne(
            {
                $or: [{ username: username }, { email: email }]
            }
        )

        if (existingUser) {
            return res.status(400).json(
                {
                    "success": false, "msg": "User exists"
                }
            )
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10) // 10 salt/complexity jaty badayo tety complex hudaii janxa
        const avatar = req.file?.path

        const newUser = new User(
            {
                username: username,
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: hashedPassword,
                avatar: avatar,
                role: role
            }
        )
        await newUser.save()
        return res.status(201).json(
            {
                "success": true,
                "msg": "User registered",
                "data": newUser
            }
        )

    } catch (e) {
        return res.status(500).json(
            {
                "success": false,
                "message": "Server error"
            }
        )
    }
}

//Read All
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(
            {
                "success": true,
                "message": "data fetched",
                "data": users
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

//Read One
exports.getOneUser = async (req, res) => {
    try {
        const _id = req.params.id // use mongo id
        const user = await User.findById(_id)
        return res.status(200).json(
            {
                "success": true,
                "message": "One User found",
                "data": user
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

//update 
exports.updateOneUser = async (req, res) => {
    const { firstName, lastName } = req.body
    const _id = req.params.id
    try {
        const user = await User.updateOne(
            {
                "_id": _id
            },
            {
                $set: {
                    "firstName": firstName,
                    "lastName": lastName
                }
            }
        )

        return res.status(200).json(
            {
                "success": true,
                "message": "One User Updated",
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

//delete

exports.deleteOneUser = async (req, res) => {
    try {
        const _id = req.params.id
        const user = await User.deleteOne(
            {
                "_id": _id
            }
        )
        return res.status(200).json(
            {
                "success": true,
                "message": "One User deleted",
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
