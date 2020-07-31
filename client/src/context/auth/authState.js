import React,{useReducer} from 'react';
import AuthContext from './authContext';
import axios from 'axios';
import AuthReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken'
import {CLEAR_ERRORS,REGISTER_SUCCESS,REGISTER_FAIL,USER_LOADED,AUTH_ERROR
        ,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT} from '../types';

const AuthState= (props) =>{
    const initialState={
        token:localStorage.getItem('token'),
        isAuthenticated:null,
        loading:true,
        error:null,
        user:null
    }
    const [state,dispatch]=useReducer(AuthReducer,initialState);
    
    //Load User

    const loaduser= async()=>{
        try {
            if(localStorage.token)
            setAuthToken(localStorage.token);
            
            const res=await axios.get('api/auth');
            dispatch({
                type:USER_LOADED,
                payload:res.data
            });
            console.log(state.user);
        } catch (err) {
            dispatch({
                type:AUTH_ERROR,
                payload:err.response.data.msg
            })
        }
    }
    //Register User
    const register= async formdata=>{
        const config={
            headers:{
                'Context-Type':'application/json'
            }
        }
        try {
            const res= await axios.post('/api/users',formdata,config);
            dispatch({
                type:REGISTER_SUCCESS,
                payload:res.data
            });
            console.log(res.data);
            loaduser();
        } catch (err) {
            dispatch({
                type:REGISTER_FAIL,
                payload:err.response.data.msg
            });
        }
    }
    //Clear Errors
    const clearErrors= ()=>{
        dispatch({type:CLEAR_ERRORS});
    }
    //Login User
    const login= async formdata=>{
        const config={
            headers:{
                'Context-Type':'application/json'
            }
        }
        try {
            const res= await axios.post('/api/auth',formdata,config);
            dispatch({
                type:LOGIN_SUCCESS,
                payload:res.data
            });
            console.log(res.data);
            loaduser();
        } catch (err) {
            dispatch({
                type:LOGIN_FAIL,
                payload:err.response.data.msg
            });
        }
    }
    const logout=()=>{
        dispatch({type:LOGOUT});
    }
    return (<AuthContext.Provider
    value={{
        token:state.token,
        isAuthenticated:state.isAuthenticated,
        loading:state.loading,
        error:state.error,
        user:state.user,
        register,
        clearErrors,
        loaduser,
        login,
        logout
    }}
    >
    {props.children}
    </AuthContext.Provider>)
};
export default AuthState;