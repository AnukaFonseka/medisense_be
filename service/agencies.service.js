const {Agency, Users} = require("../models");

//Create New Agency
async function createAgency(agency) {
    try {
        const agencyExist = await Agency.findOne({
            where: {
                description: agency.description
            }
        });

        if(agencyExist) {
            return {
                error: true,
                status: 409,
                payload: "Sorry already the agency is saved."
            }
        }
        const newAgency = await Agency.create(agency);

        return {
            error: false,
            status: 200,
            payload: "Agency successfully created!"
        };
    
    } catch(error) {
        console.error('Error creatng Agency service :' , error);
        throw error;
    }
}