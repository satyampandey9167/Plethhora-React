import React from 'react';
import { Navbar } from './layouts/navbarAndFooter/Navbar'
import './App.css';
import { Dashboard } from './layouts/dashboard/Dashboard';
import { Footer } from './layouts/navbarAndFooter/Footer';
import { UserManager } from './layouts/userManager/UserManager';
import { FaSearch } from "react-icons/fa";
import { RoleManager } from './layouts/roleManager/RoleManager';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NoPage from './layouts/NoPage/NoPage';
import { AddRole } from './layouts/roleManager/AddRole';
import { EditRoles } from './layouts/roleManager/EditRoles';
import { ViewRoles } from './layouts/roleManager/ViewRoles';
import { InvoiceManager } from './layouts/invoiceManager/InvoiceManager';
import { AddInvoice } from './layouts/invoiceManager/AddInvoice';
import { PaymentManager } from './layouts/paymentManager/PaymentManager';


export const App = () => {
  return (
    <div>
      { <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/user" element={<UserManager />} />
          <Route path="/plethhora/role-manager/roles" element={<RoleManager />} />
          <Route path="/addRole" element={<AddRole/>}/>
          <Route path="/editRole" element={<EditRoles/>}/>
          <Route path="/viewRole" element={<ViewRoles/>}/>
          <Route path="/plethhora/invoice-manager/invoice" element={<InvoiceManager/>}/>
          <Route path="/addInvoice" element={<AddInvoice/>}/>
          <Route path="/plethhora/payment-manager/payment" element={<PaymentManager/>}/>
          


          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter> }

   





      

      {/* <Navbar />
      <Dashboard />
      <UserManager />
        <Footer />
      */}

    </div>

  );
}


