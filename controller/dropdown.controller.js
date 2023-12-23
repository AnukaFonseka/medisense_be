const dropdownService = require('../service/dropdown.service');

//Get Cashier Payment Methods Dropdown
async function getPaymentMethods(req, res) {
    try {

        const userRole_id = req.user.roleId;

        // Check if the user is authorized to perform this action
        if (![1, 3].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins and Cashiers Can Select Payment Methods." });
        }

        const result = await dropdownService.getPaymentMethods();

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
        console.log("Error Getting Payment Methods Dropdown Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

module.exports = {
    getPaymentMethods
}