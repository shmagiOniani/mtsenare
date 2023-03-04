import { notification } from 'antd'
import React, { createContext, useContext, useEffect, useState } from 'react'
import useTranslation from '../translation/useTranslation'
import API from '../../utils/API'
import { UserContext } from './UserContext'
import { useLocation } from 'react-router-dom'

export const GeneralContext = createContext({})

export const GeneralContextProvider = (props) => {
    const location = useLocation();
    const { trans } = useTranslation();
    const { user } = useContext(UserContext);

    const [inspectionLines, setInspectionLines] = useState(null)
    const [paymentChannels, setPaymentChannels] = useState(null)
    const [specialVehicleTypes, setSpecialVehicleTypes] = useState(null)
    const [testTypes, setTestTypes] = useState(null)
    const [rejectedDetails, setRejectedDetails] = useState(null)
    const [ownerTypes, setOwnerTypes] = useState(null)
    const [testResults, setTestResults] = useState(null)
    const [fuelTypes, setFuelTypes] = useState(null)
    const [users, setUsers] = useState(null)
    const [branches, setBranches] = useState(null)
    const [categories, setCategories] = useState(null)
    const [bodyTypes, setBodyTypes] = useState(null)
    const [applicationStates, setApplicationStates] = useState(null)
    const [positions, setPositions] = useState(null)

    const getLines = () => {
        API.get(`/get-requests-handler`, { params: { url: `/Company/inspectionLines`, params: {} } })
            .then(res => setInspectionLines(res.data))
            .catch(err => notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" }))
    }

    const getPaymentChannels = () => {
        API.get(`/get-requests-handler`, { params: { url: `/Common/paymentChannels`, params: {} } })
            .then(res => setPaymentChannels(res.data))
            .catch(err => notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" }))
    }

    const getSpecialVehicleTypes = () => {
        API.get(`/get-requests-handler`, { params: { url: `/Common/specialVehicleTypes`, params: {} } })
            .then(res => setSpecialVehicleTypes(res.data))
            .catch(err => notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" }))
    }

    const getTestTypes = () => {
        API.get(`/get-requests-handler`, { params: { url: `/Common/testTypes`, params: {} } })
            .then(res => setTestTypes(res.data))
            .catch(err => notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" }))
    }

    const getRejectedDetails = () => {
        API.get(`/get-requests-handler`, { params: { url: `/Common/rejectedDetails`, params: {} } })
            .then(res => setRejectedDetails(res.data))
            .catch(err => notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" }))
    }

    const getOwnerTypes = () => {
        API.get(`/get-requests-handler`, { params: { url: `/Common/ownerTypes`, params: {} } })
            .then(res => setOwnerTypes(res.data))
            .catch(err => notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" }))
    }

    const getSetTestResults = () => {
        API.get(`/get-requests-handler`, { params: { url: `/Common/testResults`, params: {} } })
            .then(res => setTestResults(res.data))
            .catch(err => notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" }))
    }

    const getFuelTypes = () => {
        API.get(`/get-requests-handler`, { params: { url: `/Common/fuelTypes`, params: {} } })
            .then(res => setFuelTypes(res.data))
            .catch(err => notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" }))
    }

    const getUsers = () => {
        API.get(`/get-requests-handler`, { params: { url: `/Common/Users`, params: {} } })
            .then(res => setUsers(res.data))
            .catch(err => notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" }))
    }

    const getBranches = () => {
        API.get(`/get-requests-handler`, { params: { url: `/Company/branches`, params: {} } })
            .then(res => setBranches(res.data))
            .catch(err => notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" }))
    }

    const getCategories = () => {
        API.get(`/get-requests-handler`, { params: { url: `/Common/categories`, params: {} } })
            .then(res => setCategories(res.data))
            .catch(err => notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" }))
    }

    const getBodyTypes = () => {
        API.get(`/get-requests-handler`, { params: { url: `/Common/bodyTypes`, params: {} } })
            .then(res => setBodyTypes(res.data))
            .catch(err => notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" }))
    }

    const getApplicationStates = () => {
        API.get(`/get-requests-handler`, { params: { url: `/Common/applicationStates`, params: {} } })
            .then(res => setApplicationStates(res.data))
            .catch(err => notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" }))
    }

    const getPositions = () => {
        API.get(`/get-requests-handler`, { params: { url: `/Common/positions`, params: {} } })
            .then(res => setPositions(res.data))
            .catch(err => notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" }))
    }



    // useEffect(() => {
    //     for (const value in values) {
    //         if(values[value] === null){
    //             switch (value) {
    //                 case "inspectionLines":
    //                     getLines();
    //                     break;
    //                 case "paymentChannels":
    //                     getLines();
    //                     break;
    //                 case "specialVehicleTypes": 
    //                     getSpecialVehicleTypes();
    //                     break;
    //                 case "testTypes":
    //                     getTestTypes();
    //                     break;
    //                 case "rejectedDetails":
    //                     getRejectedDetails();
    //                     break;
    //                 case "ownerTypes":
    //                     getOwnerTypes();
    //                     break;
    //                 case "testResults":
    //                     getSetTestResults();
    //                     break;
    //                 case "fuelTypes":
    //                     getFuelTypes();
    //                     break;
    //                 case "users":
    //                     getUsers();
    //                     break;
    //                 case "branches":
    //                     getBranches();
    //                     break;
    //                 case "categories":
    //                     getCategories();
    //                     break;
    //                 case "bodyTypes":
    //                     getBodyTypes();
    //                     break;
    //                 case "applicationStates":
    //                     getApplicationStates();
    //                     break;
    //                 case "positions":
    //                     getPositions();
    //                     break;
    //                 default:
    //                     break;
    //             }
    //         }
    //     }

    // }, [])

    const values = { 
        inspectionLines,
        paymentChannels,
        specialVehicleTypes,
        testTypes,
        rejectedDetails,
        ownerTypes,
        testResults,
        fuelTypes,
        users,
        branches,
        categories,
        bodyTypes,
        applicationStates,
        positions,
    }
    return (
        <GeneralContext.Provider value={values}>
            {props.children}
        </GeneralContext.Provider>
    )
}

