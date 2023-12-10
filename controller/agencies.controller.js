const agencyService = require("../service/agencies.service");

//Create New Agency
async function createAgency(req, res) {
    try{
        const userRole_id = req.user.roleId;
        const agency = req.body;
        agency.userId = req.user.id;

        if (![1].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins can create agencies."});
    }

    const result = await agencyService.createAgency(agency);

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
        console.log("Error creating Agency controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

module.exports = {
    createAgency
}