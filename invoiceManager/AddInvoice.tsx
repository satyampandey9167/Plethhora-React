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


export const AddInvoice = () => {


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
                    // isAdd: responseData[key].add == 0 ? false : true
                });
            }
            setModules(modules);
            setIsLoading(false);
        };
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

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        // setInputs((inputs) => ({ ...inputs, [listNmae]: mList }));
        console.log(inputs);

        //console.log("mList", mList)

        const response = await fetch('http://localhost:9990/plethora/database/project/1/customers/1/role-manager/roles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputs),

        });
        const responseJson = await response.json();
        const responseData = responseJson.responseUIVO.message;
        console.log(responseData);
        alert(responseData + " Successfully ")

    }




    return (
        <div className=" p-3">
            <main>
                <form >
                    <h1 className="container"><span className="heading-1">Invoice</span><span className="heading-2"> Manager</span></h1>
                    {/* <p className="container heading-1">ADD MENU</p> */}
                    <div className="form-container">


                        <div className="search-section container">

                            <label className="role-search-label">
                                Customer Name
                                <select name="isActive" className="role-status-input" onChange={handleChange} >
                                    <option value="" selected disabled >-- Select --</option>
                                    <option value="1" >Active</option>
                                    <option value="0">InActive</option>
                                </select>
                            </label>
                            <label className="role-search-label">
                                Address
                                <input type="text" name="roleName" className="role-status-input" />

                            </label>
                          
                            <label className="role-search-label">
                                Contact No.
                                <input type="text" name="roleName" className="role-status-input" />
                            </label>
                        
                        </div>

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
                                                <input type="checkbox" name="add" />
                                            </td>
                                            <td>
                                                <input type="checkbox" name="edit" />
                                            </td>
                                            <td>
                                                <input type="checkbox" name="view" />
                                            </td>
                                            <td>
                                                <input type="checkbox" name="delete" />
                                            </td>
                                            <td>
                                                <input type="checkbox" name="checker" />
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
                            <button type="submit" onClick={handleSubmit} className="role-submit-button" >
                                <label>Submit</label>

                            </button>

                        </div>

                    </div>
                </form>
            </main>
        </div>
    );
}