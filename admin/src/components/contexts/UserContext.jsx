import React, {createContext, useState} from 'react'

export const UserContext = createContext({})

const user = {
    id: 3,
    username: "testUser",
    branchId: 3,
    companyId: 1,
    permissions: [
        "Permissions.Company",
        "Permissions.Company.Add",
        "Permissions.Company.Edit",
        "Permissions.Company.Remove",
        "Permissions.Branch",
        "Permissions.Branch.Add",
        "Permissions.Branch.Edit",
        "Permissions.Branch.Remove",
        "Permissions.VehicleApplication",
        "Permissions.VehicleApplication.Add",
        "Permissions.VehicleApplication.Edit",
        "Permissions.VehicleApplication.Done",
        "Permissions.VehicleApplication.Cancel",
        "Permissions.User",
        "Permissions.User.Add",
        "Permissions.User.Edit",
        "Permissions.User.Remove",
        "Permissions.Roles",
        "Permissions.Roles.Add",
        "Permissions.Roles.Edit",
        "Permissions.Roles.Remove",
        "Permissions.Booking",
        "Permissions.Booking.Add",
        "Permissions.Booking.Edit",
        "Permissions.Booking.Remove",
        "Permissions.Invoice",
        "Permissions.Invoice.Add",
        "Permissions.Invoice.Edit",
        "Permissions.Invoice.Remove",
        "Permissions.Machine",
        "Permissions.Machine.Add",
        "Permissions.Machine.Edit",
        "Permissions.Machine.Remove",
        "Permissions.Report",
        "Permissions.Report.InspectionResults",
        "Permissions.Report.Income",
        "Permissions.Exhaust",
        "Permissions.Brake",
        "Permissions.Report.Monthly",
        "Permissions.User.ChangePassword",
        "Permissions.AllBranchData",
        "Permissions.VehicleApplication.Count",
        "Permissions.VehicleApplication.RevertDone",
        "Permissions.VehicleApplication.Upload",
        "Permissions.VehicleApplication.UndoUpload",
        "Permissions.VehicleApplication",
        "Permissions.VehicleApplication.Add",
        "Permissions.VehicleApplication.Edit",
        "Permissions.VehicleApplication.Done",
        "Permissions.VehicleApplication.Cancel",
        "Permissions.Exhaust",
        "Permissions.Brake",
        "Permissions.AllBranchData"
    ],
    iat: 1667036541,
    exp: 1669628541,
    role: "user"
}

export const UserContextProvider = (props) => {
    const [setUser] = useState({})
    // const [user, setUser] = useState({})


    const hasPermissions = (permissionInst)=> {
        let res = user?.permissions?.includes(permissionInst);
        return res
    }

    
    
    const value = {user, setUser, hasPermissions}
    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}

