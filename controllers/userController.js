const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
exports.registerUser = async (req, res) => {
    const { username, email, firstName, lastName, password, role } = req.body
    try {
        const existingUser = await User.findOne(
            {
                $or: [{ username: username }, { email: email }]
            }
        )

        if (existingUser) {
            return res.status(400).json(
                {
                    "success": false, "message": "User exists"
                }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10) // 10 salt/complexity jaty badayo tety complex hudai janxa

        const newUser = new User(
            {
                username: username,
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: hashedPassword,
                role: role
            }
        )
        await newUser.save()
        return res.status(201).json(
            {
                "success": true,
                "message": "User registered"
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

exports.loginUser = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json(
            {
                "success": false,
                "message": "Missing field"
            }
        )
    }
    try {
        const getUser = await User.findOne(
            { "email": email }
        )

        if (!getUser) {
            return res.status(400).json(
                { "success": false, "message": "User not found" }
            )


        }

        //check for password
        const passwordCheck = await bcrypt.compare(password, getUser.password)
        if (!passwordCheck) {
            return res.status(400).json(
                { "success": false, "message": "Invalid Credentials" }
            )

        }

        //jwt
        const payload = {
            "_id": getUser._id,
            "email": getUser.email,
            "username": getUser.username,
            "firstName": getUser.firstName,
            "lastName": getUser.lastName
        }

        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "7d" })// relogin after 7 days logic
        return res.status(200).json(
            {
                "success": true,
                "message": "Login Successful",
                "data": getUser,
                "token": token
            }
        )

    } catch (error) {
        return res.status(500).json(
            { "success": false, "message": "Server error" }
        )
    }
}