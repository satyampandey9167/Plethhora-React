import { FaSearch } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import React, { useEffect, useState } from "react"
import { error } from "console"
import { useParams } from "react-router-dom";
import axios from "axios";
import ModuleListUIVO from "../../uivos/ModuleListUIVO";
import { useNavigate } from "react-router-dom";


export const ViewRoles = () => {

    const [roles, setRoles] = useState({
        customerId: '',
        projectId: '',
        roleName: '',
        isActive: ''



    });
    //Code for getModulesList --08/02-- START
    const [modules, setModules] = useState<ModuleListUIVO[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const [inputs, setInputs] = useState({});

    const [moduleCheckList, setmoduleCheckList] = useState([]);

    useEffect(() => {
        const fetchallModules = async () => {


            const baseUrl: string = "http://localhost:9990/plethora/database/project/1/customers/1/modules-manager/modules";

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
            const responseData = responseJson.modulesManagerResponse;
            //rolesgetbyid
            const baseroleUrl: string = "http://localhost:9990/plethora/database/project/1/customers/1/role-manager/roles/1";

            const roleresponse = await fetch(baseroleUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!roleresponse.ok) {
                throw new Error('Something went wrong');
            }
            const rolesData = await roleresponse.json();
            const rolesModuleList = rolesData.rolesModuleMasterVOlist;
            console.log(rolesData);
            console.log(rolesModuleList);
            const addnum = rolesModuleList.add;
            let bool = !!addnum;
            console.log(bool);
            setRoles({
                customerId: rolesData.customerId,
                projectId: rolesData.projectId,
                isActive: rolesData.isActive,
                roleName: rolesData.roleName
            });
            //end

            const modules: ModuleListUIVO[] = [];
            for (const key in responseData) {
                modules.push({
                    moduleId: responseData[key].moduleId,
                    moduleName: responseData[key].moduleName,
                    add: responseData[key].add,
                    edit: responseData[key].edit,
                    view: responseData[key].view,
                    deleted: responseData[key].deleted,
                    checker: responseData[key].checker,
                    // isAdd: rolesModuleList[key].add == 1 ? true : false

                });
            }
            setModules(modules);
            setIsLoading(false);


        };
        //getrole api call
        const fetchRoles = async () => {
            // const baseUrl: string = "http://localhost:9990/plethora/database/project/1/customers/1/role-manager/roles/16";

            // const response = await fetch(baseUrl, {
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // });

            // if (!response.ok) {
            //     throw new Error('Something went wrong');
            // }
            // const rolesData = await response.json();
            // const rolesModuleList = rolesData.rolesModuleMasterVOlist;
            // console.log(rolesData);
            // console.log(rolesModuleList);
            // setRoles({
            //     customerId:rolesData.customerId,
            //     projectId:rolesData.projectId,
            //     isActive:rolesData.isActive,
            //     roleName:rolesData.roleName
            // });

            // for (const key in rolesModuleList) {
            //     rolesModule.push({
            //         moduleId: responseData[key].moduleId,
            //         moduleName: responseData[key].moduleName,
            //         add: responseData[key].add,
            //         edit: responseData[key].edit,
            //         view: responseData[key].view,
            //         deleted: responseData[key].deleted,
            //         checker: responseData[key].checker

            //     });
            // }

        }
        fetchRoles().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })

        //end
        fetchallModules().catch((error: any) => {
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
    //Code  --08/02-- END





    const handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }



    const isAddSelected = (moduleId: number, event: any) => {
        // setIsAddChecked(!checked);
        const add = event.target.checked;
        for (let i = 0; i < modules.length; i++) {
            if (modules[i].moduleId == moduleId && add == true) {
                modules[i].add = 1;
                modules[i].edit = modules[i].edit == undefined ? 0 : modules[i].edit;
                modules[i].view = modules[i].view == undefined ? 0 : modules[i].view;
                modules[i].deleted = modules[i].deleted == undefined ? 0 : modules[i].deleted;
                modules[i].checker = modules[i].checker == undefined ? 0 : modules[i].checker;
            }
            if (modules[i].moduleId == moduleId && add == false) {
                modules[i].add = 0;
                modules[i].edit = modules[i].edit == undefined ? 0 : modules[i].edit;
                modules[i].view = modules[i].view == undefined ? 0 : modules[i].view;
                modules[i].deleted = modules[i].deleted == undefined ? 0 : modules[i].deleted;
                modules[i].checker = modules[i].checker == undefined ? 0 : modules[i].checker;
            }

        }
        // console.log(mList);
        setInputs((inputs) => ({ ...inputs, "rolesModuleMasterVOlist": modules }));
    }

    const isEditSelected = (moduleId: number, event: any) => {
        // setIsAddChecked(!checked);
        const add = event.target.checked;
        for (let i = 0; i < modules.length; i++) {
            if (modules[i].moduleId == moduleId && add == true) {
                modules[i].add = modules[i].add == undefined ? 0 : modules[i].add;
                modules[i].edit = 1;
                modules[i].view = modules[i].view == undefined ? 0 : modules[i].view;
                modules[i].deleted = modules[i].deleted == undefined ? 0 : modules[i].deleted;
                modules[i].checker = modules[i].checker == undefined ? 0 : modules[i].checker;
            }
            if (modules[i].moduleId == moduleId && add == false) {
                modules[i].add = modules[i].add == undefined ? 0 : modules[i].add;
                modules[i].edit = 0;
                modules[i].view = modules[i].view == undefined ? 0 : modules[i].view;
                modules[i].deleted = modules[i].deleted == undefined ? 0 : modules[i].deleted;
                modules[i].checker = modules[i].checker == undefined ? 0 : modules[i].checker;
            }

        }
        setInputs((inputs) => ({ ...inputs, "rolesModuleMasterVOlist": modules }));
    }
    const isViewSelected = (moduleId: number, event: any) => {
        // setIsAddChecked(!checked);
        const add = event.target.checked;
        for (let i = 0; i < modules.length; i++) {
            if (modules[i].moduleId == moduleId && add == true) {
                modules[i].add = modules[i].add == undefined ? 0 : modules[i].add;
                modules[i].edit = modules[i].edit == undefined ? 0 : modules[i].edit;
                modules[i].view = 1;
                modules[i].deleted = modules[i].deleted == undefined ? 0 : modules[i].deleted;
                modules[i].checker = modules[i].checker == undefined ? 0 : modules[i].checker;
            }
            if (modules[i].moduleId == moduleId && add == false) {
                modules[i].add = modules[i].add == undefined ? 0 : modules[i].add;
                modules[i].edit = modules[i].edit == undefined ? 0 : modules[i].edit;
                modules[i].view = 0;
                modules[i].deleted = modules[i].deleted == undefined ? 0 : modules[i].deleted;
                modules[i].checker = modules[i].checker == undefined ? 0 : modules[i].checker;
            }

        }
        setInputs((inputs) => ({ ...inputs, "rolesModuleMasterVOlist": modules }));
    }
    const isCheckerSelected = (moduleId: number, event: any) => {
        // setIsAddChecked(!checked);
        const add = event.target.checked;
        for (let i = 0; i < modules.length; i++) {
            if (modules[i].moduleId == moduleId && add == true) {
                modules[i].add = modules[i].add == undefined ? 0 : modules[i].add;
                modules[i].edit = modules[i].edit == undefined ? 0 : modules[i].edit;
                modules[i].checker = 1;
                modules[i].deleted = modules[i].deleted == undefined ? 0 : modules[i].deleted;
                modules[i].view = modules[i].view == undefined ? 0 : modules[i].view;
            }
            if (modules[i].moduleId == moduleId && add == false) {
                modules[i].add = modules[i].add == undefined ? 0 : modules[i].add;
                modules[i].edit = modules[i].edit == undefined ? 0 : modules[i].edit;
                modules[i].checker = 0;
                modules[i].deleted = modules[i].deleted == undefined ? 0 : modules[i].deleted;
                modules[i].view = modules[i].view == undefined ? 0 : modules[i].view;
            }

        }
        setInputs((inputs) => ({ ...inputs, "rolesModuleMasterVOlist": modules }));
    }
    const isDeletedSelected = (moduleId: number, event: any) => {
        // setIsAddChecked(!checked);
        const add = event.target.checked;
        for (let i = 0; i < modules.length; i++) {
            if (modules[i].moduleId == moduleId && add == true) {
                modules[i].add = modules[i].add == undefined ? 0 : modules[i].add;
                modules[i].edit = modules[i].edit == undefined ? 0 : modules[i].edit;
                modules[i].deleted = 1;
                modules[i].checker = modules[i].checker == undefined ? 0 : modules[i].checker;
                modules[i].view = modules[i].view == undefined ? 0 : modules[i].view;
            }
            if (modules[i].moduleId == moduleId && add == false) {
                modules[i].add = modules[i].add == undefined ? 0 : modules[i].add;
                modules[i].edit = modules[i].edit == undefined ? 0 : modules[i].edit;
                modules[i].deleted = 0;
                modules[i].checker = modules[i].checker == undefined ? 0 : modules[i].checker;
                modules[i].view = modules[i].view == undefined ? 0 : modules[i].view;
            }

        }
        setInputs((inputs) => ({ ...inputs, "rolesModuleMasterVOlist": modules }));
    }


    return (
        <div className=" p-3">
            <main>
                <form >
                    <h1 className="container"><span className="heading-1">Role</span><span className="heading-2"> Manager</span></h1>
                    {/* <p className="container heading-1">ADD MENU</p> */}
                    <div className="search-section container">

                        <label className="role-search-label">
                            Rolename
                            <input type="text" name="roleName" value={roles.roleName} className="role-search-input" disabled/>
                        </label>
                        <label className="role-search-label">
                            Status

                            <input type="text" name="roleName" value={roles.isActive} className="role-search-input" disabled/>


                        </label>

                        <label className="role-search-label">
                            Customer Name
                            <input type="text" name="roleName" value={roles.customerId} className="role-search-input" disabled/>

                        </label>

                        {/* <label className="role-search-label">
                            Customer Name
                            <input type="text" name="add" value={roles.add} className="role-search-input" />
                           
                        </label> */}


                    </div>

                    <div className="table-section container">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Modules Name</th>
                                    <th scope="col">Add</th>
                                    <th scope="col">Edit</th>
                                    <th scope="col">View</th>
                                    <th scope="col">Delete</th>
                                    <th scope="col">Checker</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    modules.map(module =>
                                        <tr key={module.moduleId}>
                                            <td>{module.moduleName}</td>
                                            <td>
                                                <input type="checkbox" name="add"  onClick={(e) => isAddSelected(module.moduleId, e)} disabled />
                                            </td>
                                            <td>
                                                <input type="checkbox" name="edit" onClick={(e) => isEditSelected(module.moduleId, e)} disabled/>
                                            </td>
                                            <td>
                                                <input type="checkbox" name="view" onClick={(e) => isViewSelected(module.moduleId, e)} disabled/>
                                            </td>
                                            <td>
                                                <input type="checkbox" name="delete" onClick={(e) => isDeletedSelected(module.moduleId, e)} disabled/>
                                            </td>
                                            <td>
                                                <input type="checkbox" name="checker" onClick={(e) => isCheckerSelected(module.moduleId, e)} disabled/>
                                            </td>

                                        </tr>
                                    )
                                }



                            </tbody>
                        </table>

                        <div className="submitRoleButton">
                            <button type="button" className="role-back-button">
                                <label>Back</label>
                            </button>
                           

                        </div>

                    </div>
                </form>
            </main>
        </div>
    );
}