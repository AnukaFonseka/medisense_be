const { Sequelize } = require("sequelize");
const {Admissions, Customers} = require("../models");

//Get Cashier List
async function getCashierList() {
    try {
        const cashierList = await Admissions.findAll({
            where: {
                paymentStatus: 'Not Paid'
            },
            attributes: ['id', "medicalType", "updatedAt"],
            include : [{
                model: Customers,
                as: 'customer',
                attributes: ['id','fullName', 'mobileNo']
            }]
        });

        const modifiedCashierList = cashierList.map(admission => {

            //Convert global time to local time.
            const off = admission.updatedAt.getTimezoneOffset() * 60000
            var newdt = new Date(admission.updatedAt - off).toISOString()
            const dateAndTime = newdt.split('T')
            const datePart = dateAndTime[0];
            const timePart = dateAndTime[1].substring(0, 8);
            
            return {
                
                customerId: admission.customer.id,
                admissionId: admission.id,
                fullName: admission.customer.fullName,
                medicalType: admission.medicalType,
                contactNo: admission.customer.mobileNo,
                time: timePart
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

//Get Cashier List Matrices
async function getCashierListMatrices() {
    try {

        const Op = Sequelize.Op;
        const START = new Date();
        START.setHours(0, 0, 0, 0);
        const NOW = new Date();


        const customersWaiting = await Admissions.count({
            where: {
                paymentStatus: 'Not Paid'
            }
        })

        const customersPaid = await Admissions.count({
            where: {
                paymentStatus: 'Paid',
                updatedAt: {
                    [Op.between]: [START, NOW]
                }
            }
        })

        const todaysIncome = await Admissions.sum('amountToPay', {
            where: {
                paymentStatus: 'Paid',
                updatedAt: {
                    [Op.between]: [START, NOW]
                }
            }
        })

        const matrices = {
            customersWaiting: customersWaiting,
            customersPaid: customersPaid,
            todaysIncome: todaysIncome || 0
        }

        return {
            error: false,
            status: 200,
            payload: matrices
        }

    } catch (error) {
        console.error('Error Getting Cashier List Matrices Service : ',error);
        return {
            error: true,
            status: 500,
            payload: error
        }
    }
}

module.exports = {
    getCashierList,
    getCashierListMatrices
}