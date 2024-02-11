import { FaSearch } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import React, { useEffect, useState } from "react"
import { error } from "console"
import RoleUIVO from "../../uivos/RoleUIVO";
import { Link, useNavigate } from "react-router-dom";


export const RoleManager = () => {
    const navigatorLink = useNavigate();
    const [roles, setRoles] = useState<RoleUIVO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);


    useEffect(() => {
        const fetchallRoles = async () => {


            const baseUrl: string = "http://localhost:9990/plethora/database/project/1/customers/1/role-manager/roles-all";

            const response = await fetch(baseUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const responseJson = await response.json();
            const responseData = responseJson.rolesMasterList;


            const roles: RoleUIVO[] = [];

            for (const key in responseData) {
                roles.push({
                    customerId: responseData[key].customerId,
                    projectId: responseData[key].projectId,
                    roleId: responseData[key].roleId,
                    roleName: responseData[key].roleName,
                    isActive: responseData[key].isActive,
                    createdBy: responseData[key].createdBy,
                    createdDate: responseData[key].createdDate,
                    updatedBy: responseData[key].updatedBy,
                    updatedDate: responseData[key].updatedDate,
                    status: responseData[key].status,
                    createdByRoleName: responseData[key].createdByRoleName,
                    createdByUserName: responseData[key].createdByUserName,
                    updatedByRoleName: responseData[key].updatedByRoleName,
                    updatedByUserName: responseData[key].updatedByUserName,
                    rolesAuditId: responseData[key].rolesAuditId,
                    dbVersion: responseData[key].dbVersion

                });
            }
            setRoles(roles);
            setIsLoading(false);
        };
        fetchallRoles().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []);
    if (isLoading) {
        return (
            <div className="container m-5">
                <p>Loading..</p>
            </div>
        )
    }
    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

function editRoles(){
    navigatorLink("/editRole");
}
function viewRoles(){
    navigatorLink("/viewRole");
}


    return (
        <div className=" p-3">
            <main>
                <h1 className="container"><span className="heading-1">Role</span><span className="heading-2"> Manager</span></h1>
                <div className="search-section container">
                    <form>
                        <label className="search-label">
                            Rolename:
                            <input type="text" name="roleName" className="search-input" />
                        </label>
                        {/* <label className="search-label">
                            Status:
                            <input type="text" name="status" className="search-input" />
                        </label> */}
                        <button type="submit" className="search-button">
                            <FaSearch></FaSearch>
                        </button>
                        <button type="button" className="search-button">
                            <Link to="/addRole"><IoMdAdd /></Link>
                        </button>
                    </form>
                </div>

                <div className="table-section container">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">RoleId</th>
                                <th scope="col">Role Name</th>
                                <th scope="col">Status</th>
                                <th scope="col">Created By</th>
                                <th scope="col">Created Date</th>
                                <th scope="col" align="right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                roles.map(role =>
                                    <tr key={role.customerId}>
                                        <td>{role.roleId}</td>
                                        <td>{role.roleName}</td>
                                        <td>{role.status}</td>
                                        <td>{role.createdBy}</td>
                                        <td>{role.createdDate}</td>
                                        <td><button type="submit" className="search-button" onClick={editRoles}>
                                            <FaEdit />
                                        </button><button type="submit" className="search-button" onClick={viewRoles}>
                                                <FaRegEye />
                                            </button><button type="submit" className="search-button" >
                                                <FaTrashAlt />
                                            </button></td>
                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}