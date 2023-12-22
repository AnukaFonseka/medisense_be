const {Admissions, Customers} = require("../models");

//Get Cashier List
async function getCashierList() {
    try {
        const cashierList = await Admissions.findAll({
            where: {
                paymentStatus: 'Not Paid'
            },
            attributes: ['id'],
            include : [{
                model: Customers,
                as: 'customer',
                attributes: ['id','fullName']
            }]
        });

        const modifiedCashierList = cashierList.map(cashier => {
            return {
                
                customerId: cashier.customer.id,
                admissionId: cashier.id,
                fullName: cashier.customer.fullName
            }
        })

        return {
            error: false,
            status: 200,
            payload: modifiedCashierList
        }
    } catch (error) {
        console.error('Error Getting Cashier List Service : ',error);
        return {
            error: true,
            status: 500,
            payload: error
        }
    }
}

module.exports = {
    getCashierList
}