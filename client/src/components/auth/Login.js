import React, { useContext, useState,useEffect } from 'react';
import AuthContext from '../../context/auth/authContext'
import AlertContext from '../../context/alert/alertContext';
const Login=(props)=>{
    const authContext=useContext(AuthContext);
    const alertContext=useContext(AlertContext);
    const {login,error,clearErrors,isAuthenticated}=authContext;
    const {setAlert} =alertContext;
    const [user,setUser]=useState({
        email:'',
        password:'',
    });
    const {email,password}=user;
    
    useEffect(()=>{
        if(isAuthenticated)
        props.history.push('/');
        if(error==='Invalid credentials'){
            setAlert(error,'danger')
            clearErrors();
        }
    },[error,props.history,isAuthenticated])
    
    const onChange=(e)=>{
        setUser({...user, [e.target.name]:e.target.value})
    }
    const onSubmit=(e)=>{
        e.preventDefault();
        login({email,password});
    }
    return (
    <div className='form-container'>
        <h1> Account <span className='text-primary'>Login</span></h1>
        <form onSubmit={onSubmit}>
            <div className='form-group'>
                <label htmlFor='email'>
                Email 
                </label>
                <input type='email' name='email' value={email} onChange={onChange}/>
            </div>
            <div className='form-group'>
                <label htmlFor='password'>
                Password
                </label>
                <input type='password' name='password' value={password} onChange={onChange}/>
            </div>
            <input type='submit' value ='Register' />
        </form>
    </div>
    );
}
export default Login;