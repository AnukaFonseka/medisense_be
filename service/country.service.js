const{Countries, Users} = require("../models");

//Create New Country
async function createCountry(country) {
    try {
        const countryExist = await Countries.findOne({
            where: {
                name: country.name
            }
        });

        if(countryExist) {
            return {
                error: true,
                status: 409,
                payload: "Sorry already the country is saved."
            }
        } 
        const newCountry = await Countries.create(country);

        return {
            error: false,
            status: 200,
            payload: "Country successfully created!"
        };
    
    } catch(error) {
        console.error('Error creatng Country service :' , error);
        throw error;
    }
}

//Get All Countries
async function getAllCountries() {
    try {
        const country = await Countries.findAll();

        if(!country) {
            return {
                error: true,
                status: 404,
                payload: "No country data available!"
            }
        } else {
            return {
                error: false,
                status: 200,
                payload: country
            }
        }
            
        
    } catch (error) {
        console.error('Error getting Agency service :' ,error);
        throw error;       
    }
}
module.exports ={
    createCountry,
    getAllCountries
} 