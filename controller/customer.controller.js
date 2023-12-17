const customerService = require("../service/customer.service");

//Register Customer
async function registerCustomer(req, res) {
    try {
        const userRole_id = req.user.roleId;

        //Destructure the request body into 3 parts as customer details, selected packages and selected tests.
        const customerDetails = req.body.applicantDetails;
        const packages = req.body.packages;
        const tests = req.body.tests;
        

        if (![1, 2].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins and Receptionists can create Customers." });
        }

        //Save customer details
        const resultCustomer = await customerService.registerCustomer(customerDetails);

        if(resultCustomer.error) {
            return res.status(resultCustomer.status).json ({
                error: true,
                payload: resultCustomer.payload
            })
        } 

        //Store the saved customers' ID and the Admission ID for create Customer Packages and Tests.  
        const customerId = resultCustomer.payload.id
        const admissionId = resultCustomer.payload.admissionId

        //If customer has selected Packages.
        if(packages) {
            const resultPackages = await customerService.createCustomerPackages(packages, customerId, admissionId);
            
            if(resultPackages.error) {
                return res.status(resultPackages.status).json ({
                    error: true,
                    payload: resultPackages.payload
                })
            }
        }

        //Save selected tests.
        const resultTests = await customerService.createCustomerTests(tests, customerId, admissionId);

        if(resultTests.error) {
            return res.status(resultTests.status).json ({
                error: true,
                payload: resultTests.payload
            })
        }
        else {
            return res.status(resultTests.status).json ({
                error: false,
                payload: "Customer Successfully Registered!"
            })
        } 
    } catch (error) {
        console.log("Error Creating Customer Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

module.exports = {
    registerCustomer
}