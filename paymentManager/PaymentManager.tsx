import { FaSearch } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import React, { useEffect, useState } from "react"
import { error } from "console"

import { Link, useNavigate } from "react-router-dom";
import InvoiceUIVO from "../../uivos/InvoiceUIVO";
import PaymentUIVO from "../../uivos/PaymentUIVO";


export const PaymentManager = () => {
    const navigatorLink = useNavigate();
    const [payment, setPayment] = useState<PaymentUIVO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);


    useEffect(() => {
        const fetchallpayment = async () => {


            const baseUrl: string = "http://localhost:9990/plethora/database/project/1/customers/1/payment/domain/transaction";

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
            


            const payment: PaymentUIVO[] = [];

            for (const key in responseJson) {
                payment.push({
                    fromCustomerId: responseJson[key].fromCustomerId,
                    fromProjectId: responseJson[key].fromProjectId,
                    transactionId: responseJson[key].transactionId,
                    createdBy: responseJson[key].createdBy,
                    transactionDate: responseJson[key].transactionDate,
                    status: responseJson[key].status
                   

                });
            }
            setPayment(payment);
            setIsLoading(false);
        };
        fetchallpayment().catch((error: any) => {
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
        navigatorLink("/#");
    }
    function viewRoles() {
        navigatorLink("/#");
    }


    return (
        <div className=" p-3">
            <main>
                <h1 className="container"><span className="heading-1">Payment</span><span className="heading-2"> Manager</span></h1>
                <div className="search-section container">
                    <form>
                        <label className="search-label">
                            Payment Id:
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
                            <Link to="/#"><IoMdAdd /></Link>
                        </button>
                    </form>
                </div>

                <div className="table-section container">
                            
                    
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Payment Id</th>
                                <th scope="col">Customer Id</th>
                                <th scope="col">Created By</th>
                                <th scope="col">Created Date</th>
                                <th scope="col">Status</th>
                                <th scope="col" align="right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                payment.map(pymt =>
                                    <tr key={pymt.transactionId}>
                                        <td>{pymt.transactionId}</td>
                                        <td>{pymt.fromCustomerId}</td>
                                        <td>{pymt.createdBy}</td>
                                        <td>{pymt.transactionDate}</td>
                                        <td>{pymt.status}</td>
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