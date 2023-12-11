const { sign } = require("jsonwebtoken");
const { Users, Roles } = require("../models");
const bcrypt = require("bcrypt");

//Register User
async function registerUser(firstName, lastName, email, contactNo, username, hashPassword,roleId ) {
    try { 
        const usernameExist = await Users.findOne({
            where: {
                username: username
            }
        })

        const emailExist = await Users.findOne({
            where: {
                email: email
            }
        })

        if(usernameExist) {
            return {
                error: true,
                status: 409,
                payload: "Sorry, that username already exists!"
            }
        }

        if(emailExist) {
            return {
                error: true,
                status: 409,
                payload: "Sorry, a user already exists with that email address!"
            }
        }
        const role = await Roles.findByPk(roleId);

        if(!role){
            return {
                error : true,
                status: 400,
                payload: "Wrong Role Id."
            }
        }
        const newUser = await Users.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            contactNo: contactNo,
            username: username,
            password: hashPassword,
            roleId: roleId,
           
          });

          return {            
            error: false,
            status: 200,
            payload: "User Successfully Created"
        }

    } catch (error) {
        console.error('Error Creating User Service : ',error);
        throw error;
    }
}

//Login User
async function loginUser(username) {
    try {
        const user = await Users.findOne({ 
            where: { 
                username: username 
            },
            include: {
                model: Roles,
                as: 'roles',
                attributes: ['role']
            }
        }
        
        );
        return user;
    } catch (error) {
        console.error('Error Login In User Service : ',error);
        throw error;
    }
}

//Get User Roles
async function getUserRoles(){
    try {
        const roles = await Roles.findAll();

        if(!roles){
            return {
                error : true,
                status: 404,
                payload: "No User Roles Available. Please Create User Roles In The Database."
            }
        }
        else {
            return {
                error: false,
                status: 200,
                payload: roles
            }
        }
    } catch (error) {
        console.error('Error Getting User Roles Service : ',error);
        throw error;
    }
}

//Get All Users.
async function getAllUsers() {
    try {
        const users = await Users.findAll({
            attributes: {
                exclude: ['password']
            },
            include: {
                model: Roles,
                as: 'roles',
                attributes: ['role']
            }
        });

        if(!users) {
            return {
                error: true,
                status: 404,
                payload: "User Doesn't Exist"
            }
        }
        else {
            return {
                error: false,
                status: 200,
                payload: users
            }
        }

    } catch (error) {
        console.error('Error Getting User Service : ',error);
        throw error;
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserRoles,
    getAllUsers
}