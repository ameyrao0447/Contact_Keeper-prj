import React, { Fragment,useContext } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'
const Navbar=({tittle,icon})=>{
    const authContext=useContext(AuthContext);
    const {isAuthenticated,user,logout}=authContext;
    const onLogout=()=>{
        logout();
    }
    const authLinks=(
        <Fragment>
            <li>Hello {user!=null && user.name}</li>
            <li>
                <a href="#!" onClick={onLogout}>
            <li className="fas fa-sign-out-alt"></li>
            <span className="hide-sm">LogOut</span>
            </a></li>
        </Fragment>
    );
    const guestLinks=(
        <Fragment>
            <li><Link to='/register'>Register</Link></li>
            <li><Link to='/login'>Login</Link></li>
        </Fragment>
    )
    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon}>{tittle}</i>
            </h1>
            <ul>
                {isAuthenticated ?authLinks:guestLinks}
            </ul>
        </div>
    );
}
Navbar.propTypes={
    tittle:PropTypes.string.isRequired,
    icon:PropTypes.string
};
Navbar.defaultProps={
    tittle:"Contact Keeper",
    icon:"fas fa-id-card-alt"
}
export default Navbar;