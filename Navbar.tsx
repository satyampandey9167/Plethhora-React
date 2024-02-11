import { Link, Outlet } from "react-router-dom";

export const Navbar = () => {

    return (
        <>
            <nav className='menu-bar navbar navbar-expand-lg navbar-dark main-color'>
                <div className='container-fluid'>
                    <span className='logo navbar-brand'>Plethhora</span>
                    <button className=' navbar-toggler' type='button'
                        data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown'
                        aria-controls='navbarNavDropdown' aria-expanded='false'
                        aria-label='Toggle Navigation'>

                        <span className='navbar-toggler-icon '></span>

                    </button>
                    <div className='collapse navbar-collapse' id='navbarNavDropdown'>
                        <ul className='menu-bar navbar nav'>
                            <li className='nav-item'>
                                <a className='menu-bar nav-link' href='/'>Dashboard</a>
                            </li>
                            <li className='nav-item'>
                                <a className='menu-bar nav-link' href='#'>Customer Manager</a>
                            </li>
                            <li className='nav-item'>
                                <a className='menu-bar nav-link' href='/plethhora/role-manager/roles'>Role Manager</a>
                                {/* <Link to="/role">Role Manager</Link> */}

                            </li>
                            <li className='nav-item'>
                                <a className='menu-bar nav-link' href='/user'>User Manager</a>
                            </li>
                            <li className='nav-item'>
                                <a className='menu-bar nav-link' href='#'>Account Manager</a>
                            </li>
                            <li className='nav-item'>
                                <a className='menu-bar nav-link' href='/plethhora/invoice-manager/invoice'>Invoice Manager</a>
                            </li>
                            <li className='nav-item'>
                                <a className='menu-bar nav-link' href='#'>Workflow Manager</a>
                            </li>
                            <li className='nav-item'>
                                <a className='menu-bar nav-link' href='/plethhora/payment-manager/payment'>Payment Manager</a>
                            </li>
                            {/* <li className='nav-item'>
                                <a className='menu-bar nav-link' href='#'>Status</a>
                            </li> */}
                            <li className='nav-item'>
                                <a className='menu-bar nav-link' href='#'>Log Out</a>
                            </li>
                        </ul>
                    </div>
                </div>

            </nav>
        </>
    );
}