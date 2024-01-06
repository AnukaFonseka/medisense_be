const { Sequelize, Op } = require("sequelize");
const {Admissions, Customers, CustomerTests, Tests, Packages, CustomerPackages} = require("../models");

//Get Patient List For Mini Lab 
async function getMiniLabList() {
    try {
        const miniLabList = await Admissions.findAll({
            where: {
                miniLabStatusId: null
            },
            attributes: ['id', "medicalType", "updatedAt"],
            include : [{
                model: Customers,
                as: 'customer',
                attributes: ['id', 'image', 'fullName', 'mobileNo']
            }]
        });

        if (!miniLabList) {
            return {
                error: true,
                status: 404,
                payload: "No patients are registered for miniLab tests."
            }
        }

        const modifiedMiniLabList = miniLabList.map(admission => {

            //Convert global time to local time.
            const off = admission.updatedAt.getTimezoneOffset() * 60000
            var newdt = new Date(admission.updatedAt - off).toISOString()
            const dateAndTime = newdt.split('T')
            const datePart = dateAndTime[0];
            const timePart = dateAndTime[1].substring(0, 8);
            
            return {
                customerId: admission.customer.id,
                admissionId: admission.id,
                image: admission?.customer?.image,
                fullName: admission.customer.fullName,
                medicalType: admission.medicalType,
                contactNo: admission.customer.mobileNo,
                time: timePart
            }
        })

        return {
            error: false,
            status: 200,
            payload: modifiedMiniLabList
        }
    } catch (error) {
        console.error('Error Getting Mini Lab List Service : ',error);
        return {
            error: true,
            status: 500,
            payload: error
        }
    }
}

//Get Customer Tests for Mini Lab
async function getCustomerTests(customerId, admissionId) {
    try {
        const customerTests = await CustomerTests.findAll({
            where: {
                customerId: customerId,
                admissionId: admissionId
            },
            attributes: ['id','packageId', 'testId'],
            include: [{
                model: Tests,
                as: 'test',
                attributes: ['id','testCode', 'description', 'price', 'type'],
                where: {
                    type: "Type A"
                }
            }]
        });

        if (!customerTests) {
            return {
                error: true,
                status: 404,
                payload: "No tests are registered for this patient."
            }
        }

        const testsList = customerTests.map(test => {
            return {
                packageId: test?.packageId,
                testId: test?.test?.id,
                testCode: test?.test?.testCode,
                description: test?.test?.description,
                type: test?.test?.type,
                price: test?.test?.price
            }
        });

        return {
            error: false,
            status: 200,
            payload: testsList
        }

    } catch (error) {
        console.error('Error Getting Customer Tests Mini Lab Service : ',error);
        return {
            error: true,
            status: 500,
            payload: error
        }
    }
}

//Update Mini Lab Status
async function updateMiniLabStatus(customerId, admissionId, data) {
    try {
        const admission = await Admissions.findOne({
            where: {
                id: admissionId,
                customerId: customerId
            }
        })

        if(!admission) {
            return {
                error: true,
                status: 404,
                payload: 'Admission Not Found'
            }
        }

        const payment = await admission.update(data);

        return {
            error: false,
            status: 200,
            payload: "Mini Lab status updated successfully!"
        }
    } catch (error) {
        console.error('Error Creating Customer Payments Service : ',error);
        return {
            error: true,
            status: 500,
            payload: error
        }
    }
}


module.exports = {
    getMiniLabList,
    getCustomerTests,
    updateMiniLabStatus
}