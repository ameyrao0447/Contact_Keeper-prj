import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext'
import AlertContext from '../../context/alert/alertContext';
const Register=props=>{
    const authContext=useContext(AuthContext);
    const alertContext=useContext(AlertContext); 
    const [user,setUser]=useState({
        name:'',
        email:'',
        password:'',
        conpassword:''
    });
    const {name,email,password,conpassword}=user;
    const {register,error,clearErrors,isAuthenticated}=authContext;
    const {setAlert} =alertContext;

    useEffect(()=>{
        if(isAuthenticated)
        props.history.push('/');
        if(error==='User already exits'){
            setAlert(error,'danger')
            clearErrors();
        }
    },[error,props.history,isAuthenticated])
    const onChange=(e)=>{
        setUser({...user, [e.target.name]:e.target.value})
    }
    const onSubmit=(e)=>{
        e.preventDefault();
        if(password!==conpassword)
        setAlert('Password doesnt not match','danger');
        else
        {
            register({
                name,
                email,
                password
            });
        setAlert('User registerd!!','success');
        }
    }
    return (
    <div className='form-container'>
        <h1> Account <span className='text-primary'>Register</span></h1>
        <form onSubmit={onSubmit}>
            <div className='form-group'>
                <label htmlFor='name'>
                Name
                </label>
                <input type='text' name='name' value={name} onChange={onChange}/>
            </div>
            <div className='form-group'>
                <label htmlFor='email'>
                Email 
                </label>
                <input type='email' name='email' value={email} onChange={onChange}/>
            </div>
            <div className='form-group'>
                <label htmlFor='password'>
                Name
                </label>
                <input type='password' name='password' value={password} onChange={onChange}/>
            </div>
            <div className='form-group'>
                <label htmlFor='conpasword'>
                Name
                </label>
                <input type='password' name='conpassword' value={conpassword} onChange={onChange}/>
            </div>
            <input type='submit' value ='Register' />
        </form>
    </div>
    );
}
export default Register;