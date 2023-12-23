const { where } = require("sequelize");
const { Dropdowns, DropdownData } = require("../models");

//Get Cashier Payment Methods Dropdown
async function getPaymentMethods(req, res) {
    try {
        const paymentMethods = await Dropdowns.findOne({
            where: {
                label: 'paymentMethods'
            },
            include: [{
                model: DropdownData,
                as: 'dropdownData'
            }]
        });

        if(!paymentMethods) {
            return {
                error: true,
                status: 404,
                payload: "No Payment Methods Found!"
            }
        }

        const dropdown = paymentMethods.dropdownData.map(data => {
            return {
                id: data.id,
                label: data.label,
            }
        })

        return {
            error: false,
            status: 200,
            payload: dropdown
        }
    } catch (error) {
        console.error('Error Getting Payment Methods Dropdown Service : ',error);
        return {
            error: true,
            status: 500,
            payload: error
        }
    }
}

module.exports = {
    getPaymentMethods
}