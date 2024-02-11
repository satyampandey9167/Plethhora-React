import { FaSearch } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import React, { useEffect, useState } from "react"
import { error } from "console"

import { Link, useNavigate } from "react-router-dom";
import InvoiceUIVO from "../../uivos/InvoiceUIVO";


export const InvoiceManager = () => {
    const navigatorLink = useNavigate();
    const [invoice, setInvoice] = useState<InvoiceUIVO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);


    useEffect(() => {
        const fetchallInvoice = async () => {


            const baseUrl: string = "http://localhost:9990/plethora/database/project/1/customers/1/invoice-manager/invoice";

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
            const responseData = responseJson.invoiceMasterVOList;


            const invoice: InvoiceUIVO[] = [];

            for (const key in responseData) {
                invoice.push({
                    customerId: responseData[key].customerId,
                    projectId: responseData[key].projectId,
                    invoiceMasterId: responseData[key].invoiceMasterId,
                    invoiceNumber:responseData[key].invoiceNumber,
                    createdBy: responseData[key].createdBy,
                    createdDate: responseData[key].createdDate,
                    status: responseData[key].status,
                    dbVersion: responseData[key].dbVersion

                });
            }
            setInvoice(invoice);
            setIsLoading(false);
        };
        fetchallInvoice().catch((error: any) => {
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

    function editRoles() {
        navigatorLink("/editRole");
    }
    function viewRoles() {
        navigatorLink("/viewRole");
    }


    return (
        <div className=" p-3">
            <main>
                <h1 className="container"><span className="heading-1">Invoice</span><span className="heading-2"> Manager</span></h1>
                <div className="search-section container">
                    <form>
                        <label className="search-label">
                            Invoice Number:
                            <input type="text" name="invoiceNumber" className="search-input" />
                        </label>
                        {/* <label className="search-label">
                            Status:
                            <input type="text" name="status" className="search-input" />
                        </label> */}
                        <button type="submit" className="search-button">
                            <FaSearch></FaSearch>
                        </button>
                        <button type="button" className="search-button">
                            <Link to="/addInvoice"><IoMdAdd /></Link>
                        </button>
                    </form>
                </div>

                <div className="table-section container">
                            
                    
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Invoice Id</th>
                                <th scope="col">Customer Name</th>
                                <th scope="col">Invoice Number</th>
                                <th scope="col">Created By</th>
                                <th scope="col">Created Date</th>
                                <th scope="col">Status</th>
                                <th scope="col" align="right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                invoice.map(inv =>
                                    <tr key={inv.invoiceMasterId}>
                                        <td>{inv.invoiceMasterId}</td>
                                        <td>{inv.customerId}</td>
                                        <td>{inv.invoiceNumber}</td>
                                        <td>{inv.status}</td>
                                        <td>{inv.createdBy}</td>
                                        <td>{inv.createdDate}</td>
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