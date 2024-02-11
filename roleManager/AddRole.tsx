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


export const AddRole = () => {


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



    // const saveRole=(e:any) =>{
    //     e.preventDefault();
    //     const roleName = e.target.value;
    //     const isActive = e.target.value;
    //     const customerId = e.target.value;
    //     const data = {roleName,isActive,customerId}
    //     axios.post("http://localhost:9990/plethora/database/project/1/customers/1/role-manager/roles",data)
    //     .then((response) =>{
    //         console.log(response);
    //         e.target.reset();

    //     })
    //     .catch((error) =>{
    //         console.log(error);
    //     });

    // };

    //     const data={
    //         roleName:"",
    //         isActive:"",
    //         customerId:""
    //     };

    //    const [inputData,setInputData] = useState(data);

    //    const handleData =(e) => {
    //     setInputData({...inputData,[e.target.name]:e.target.value})
    //    }
    //    const saveRole =(e)=>{
    //     e.preventDefault();
    //     axios.post("http://localhost:9990/plethora/database/project/1/customers/1/role-manager/roles",inputData)
    //     .then((response)=>{
    //         console.log(response);
    //     })
    //    }


    //    const url = "http://localhost:9990/plethora/database/project/1/customers/1/role-manager/roles";
    // function createRole(e:any){
    //     const request={
    //         roleName,
    //         isActive,
    //         customerId,
    //         rolesModuleMasterVOlist: [{
    //             add,
    //             edit,
    //             view,
    //             delete,
    //             checker


    //         }]


    //     }
    // }



    const handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = async(event: any) => {
        event.preventDefault();
        // setInputs((inputs) => ({ ...inputs, [listNmae]: mList }));
        console.log(inputs);
        
        //console.log("mList", mList)

        const response = await fetch('http://localhost:9990/plethora/database/project/1/customers/1/role-manager/roles',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(inputs),
            
        });
        const responseJson = await response.json();
            const responseData = responseJson.responseUIVO.message;
            console.log(responseData);
            alert(responseData +" Successfully ")
        
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
                            <input type="text" name="roleName" onChange={handleChange} className="role-status-input" />
                        </label>
                        <label className="role-search-label">
                            Status

                            <select name="isActive" className="role-status-input" onChange={handleChange} >
                                <option value="" selected disabled>-- Select --</option>
                                <option value="1" >Active</option>
                                <option value="0">InActive</option>
                            </select>
                        </label>

                        <label className="role-search-label">
                            Customer Name
                            <select name="customerId" className="role-status-input" onChange={handleChange} >
                            <option value="" selected disabled>-- Select --</option>
                                <option value="1">Satyam Pandey</option>
                                <option value="2">Rahul Chaubey</option>

                            </select>
                        </label>
                        {/* <label className="search-label">
                            Status:
                            <input type="text" name="status" className="search-input" />
                        </label> */}
                        {/* <button type="submit" className="search-button">
                            <FaSearch></FaSearch>
                        </button> */}
                        {/* <button type="submit" className="search-button">
                            <IoMdAdd />
                        </button> */}

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
                                                <input type="checkbox" name="add" onClick={(e) => isAddSelected(module.moduleId, e)} />
                                            </td>
                                            <td>
                                                <input type="checkbox" name="edit" onClick={(e) => isEditSelected(module.moduleId, e)} />
                                            </td>
                                            <td>
                                                <input type="checkbox" name="view" onClick={(e) => isViewSelected(module.moduleId, e)} />
                                            </td>
                                            <td>
                                                <input type="checkbox" name="delete" onClick={(e) => isDeletedSelected(module.moduleId, e)} />
                                            </td>
                                            <td>
                                                <input type="checkbox" name="checker" onClick={(e) => isCheckerSelected(module.moduleId, e)} />
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