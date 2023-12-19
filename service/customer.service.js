const {Customers, Admissions, CustomerPackages, Packages, Tests, CustomerTests} = require("../models");

//Register Customer
async function registerCustomer(customer) {
    try {
        const newCustomer = await Customers.create(customer);

        const admissionDetails = {
            customerId: newCustomer.id,
            medicalType: customer.medicalType
        }

        const newAdmission = await Admissions.create(admissionDetails);

        newCustomer.admissionId = newAdmission.id

        return {
            error: false,
            status: 200,
            payload: newCustomer
        }
    
    } catch (error) {
        console.error('Error Creating Customer Service : ',error);
        if(error.name === "SequelizeForeignKeyConstraintError") {
            return {
                status: 409, // Bad Request status for duplicate email
                payload: "Conflict due to foreign key constraint.",
                error: true,
            }
        }
        return {
            error: true,
            status: 500,
            payload: error
        }
    }
}

//Create Customer Packages
async function createCustomerPackages(packages, customerId, admissionId) {
    try {
        const packageList = packages.map((package, index) => {
            return {
                packageId: package,
                customerId: customerId,
                admissionId: admissionId
            }
        });

        const customerPackages = await CustomerPackages.bulkCreate(packageList);

        return {
            error: false,
            status: 200,
            payload: customerPackages
        }
    
    } catch (error) {
        console.error('Error Creating Customer Packages Service : ',error);
        if(error.name === "SequelizeForeignKeyConstraintError") {
            return {
                status: 409, // Conflict status code due to a conflict with the current state of the resource
                payload: "Conflict due to foreign key constraint.",
                error: true,
            }
        }
        return {
            error: true,
            status: 500,
            payload: error
        }
    }
}

//Create Customer Tests
async function createCustomerTests(tests, customerId, admissionId) {
    try {
        if(tests == null) {
            tests = []
        }
        
        let testList1 = tests.map((test, index) => {
            console.log(test, customerId, admissionId)
            return {
                testId: test,
                customerId: customerId,
                admissionId: admissionId
            }
        });

        const packageTests = await CustomerPackages.findAll({
            where: {
                customerId: customerId,
                admissionId: admissionId
            }, 
            include: {
                model: Packages,
                as: 'package',
                include: {
                    model: Tests,
                    through: "PackageTests"
                }
            }
        })

        if(!packageTests) {

            const customerTests = await CustomerTests.bulkCreate(testList1);
            return {
                error: false,
                status: 200,
                payload: customerTests
            }
        }
        else {
            for(let i = 0; i < packageTests.length; i++) {
                const package = packageTests[i].package;
                const tempList = package.Tests.map((test, index) => {
                    console.log(test.id, customerId, admissionId)
                    return {
                        testId: test.id,
                        customerId: customerId,
                        admissionId: admissionId
                    }
                })
                testList1 = testList1.concat(tempList)
    
            }
    
            const customerTests = await CustomerTests.bulkCreate(testList1);
    
    
            return {
                error: false,
                status: 200,
                payload: customerTests
            }
        }
        
    
    } catch (error) {
        console.error('Error Creating Customer Test Service : ',error);
        return {
            error: true,
            status: 500,
            payload: error
        }
    }
}

//Get All Customers
async function getAllCustomers() {
    try {
        const customers = await Customers.findAll();

        if(!customers) {
            return {
                error: true,
                status: 404,
                payload: "No Customers Found!"
            }
        } 
        else {
            return{
                error: false,
                status: 200,
                payload: customers
            }
        }
        
    } catch (error) {
        console.error('Error Getting Customer Service : ',error);
        return {
            error: true,
            status: 500,
            payload: error
        }
    }
}



module.exports = {
    registerCustomer,
    createCustomerPackages,
    createCustomerTests,
    getAllCustomers
}