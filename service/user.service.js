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
async function loginUser(username, password) {
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
        });
        // console.log(user)

        if (!user) {
            return { 
                error: true,
                status: 404,
                payload: "User Doesn't Exist"
            };
        }

        bcrypt.compare(password, user.password).then(async (match) => {
            if (!match) {
                    return { 
                        error: true,
                        status: 400,
                        payload: "Wrong Username And Password Combination" 
            };
        }
            else{
               const accessToken = sign(
                { username: user.username, id: user.id, role: user.roles.role, roleId: user.roleId },
                "importantsecret"
              );
              console.log(accessToken)
              return {
                error: false,
                status: 200,
                payload: accessToken
              }
            }  
          });

        
    } catch (error) {
        console.error('Error Login In User Service : ',error);
        throw error;
    }
}

module.exports = {
    registerUser,
    loginUser
}