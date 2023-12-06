const bcrypt = require("bcrypt");
const userService = require("../service/user.service");
const { sign } = require("jsonwebtoken");

//Register User 
async function registerUser(req, res) {
    try {
        const userRole_id = req.user.roleId;
        const {firstName, lastName,email,contactNo, username, password, roleId } = req.body;

        if (![1].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins can create users." });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const result = await userService.registerUser(firstName, lastName,email,contactNo,username, hashPassword, roleId);
        
        if(result.error) {
            return res.status(result.status).json ({
                error: true,
                payload: result.payload
            })
        } else {
            return res.status(result.status).json ({
                error: false,
                payload: result.payload
            })
        } 

    } catch (error) {
        console.log("error in user controller: ", error)
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

//Login User
async function loginUser(req, res) {
    try {
        const { username, password } = req.body;

        const result = await userService.loginUser(username, password);

        console.log(result);

        if(result.error) {
            return res.status(result.status).json ({
                error: true,
                payload: result.payload
            })
        } else {
            return res.status(result.status).json ({
                error: false,
                payload: result.payload
            })
        } 
        
    } catch (error) {
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

module.exports = {
    registerUser,
    loginUser
}