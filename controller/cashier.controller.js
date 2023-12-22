const cashierService = require('../service/cashier.service');

//Get Cashier List
async function getCashierList(req, res) {
    try {
        const result = await cashierService.getCashierList();

        if(result.error) {
            return res.status(result.status).json ({
                error: true,
                payload: result.payload
            })
        }
        else {
            return res.status(result.status).json ({
                error: false,
                payload: result.payload
            })
        } 

    } catch (error) {
        console.log("Error Getting CashierList Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

//Get Cashier List Matrices
async function getCashierListMatrices(req, res) {
    try {
        const result = await cashierService.getCashierListMatrices();

        if(result.error) {
            return res.status(result.status).json ({
                error: true,
                payload: result.payload
            })
        }
        else {
            return res.status(result.status).json ({
                error: false,
                payload: result.payload
            })
        } 

    } catch (error) {
        console.log("Error Getting CashierList Matrices Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

module.exports = {
    getCashierList,
    getCashierListMatrices
}   