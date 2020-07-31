import React,{useReducer} from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import axios from 'axios'
import { ADD_CONTACT,
         DELETE_CONTACT,
         SET_CURRENT,
         CLEAR_CURRENT,
         UPDATE_CONTACT,
         FILTER_CONTACT,
         CLEAR_FILTER,
         CONTACT_ERRORS,
         GET_CONTACT
        } from '../types';

const ContactState= (props) =>{
    const initialState={
        contacts:[],
        current:null,
        error:null
    }
    const [state,dispatch]=useReducer(contactReducer,initialState);
    //Get Contact 
    const getContact= async ()=>{
        try {
            const res=await axios.get('/api/contact'); 
            dispatch({type:GET_CONTACT,payload:res.data});    
        } catch (err) {
            dispatch({type:CONTACT_ERRORS,payload:err.response.data.msg});
        }   
    }
    //Add Contact 
    const addContact= async (contact)=>{
        try {
            const config={
                headers:{
                'Context-Type':'application/json'
                }
            }
            const res=await axios.post('/api/contact',contact,config); 
            dispatch({type:ADD_CONTACT,payload:res.data});    
        } catch (err) {
            dispatch({type:CONTACT_ERRORS,payload:err.response.data.msg});
        }   
    }
    //Delete Contact 
    const deleteContact= async(id)=>{
        try {
        await axios.delete(`/api/contact/${id}`); 
        dispatch({type:DELETE_CONTACT,payload:id});    
        } catch (err) {
            dispatch({type:CONTACT_ERRORS,payload:err.response.data.msg});
        }
        
    }
    //update Contact 
    const updateContact= async(contact)=>{
        try {
            const config={
                headers:{
                'Context-Type':'application/json'
                }
            }
            const res=await axios.put(`/api/contact/${contact._id}`,contact,config); 
            dispatch({type:UPDATE_CONTACT,payload:res.data});    
        } catch (err) {
            dispatch({type:CONTACT_ERRORS,payload:err.response.data.msg});
        }
        
    }
    //Filter Contact
    const filterContact=(text)=>{
        dispatch({type:FILTER_CONTACT,payload:text});
    }
    // clear Filter
    const clearFilter=()=>{
        dispatch({type:CLEAR_FILTER});
    }
    //Set Current 
    const setCurrent=contact=>{
        dispatch({type:SET_CURRENT,payload:contact});
        console.log(contact);
    }
    //Clear Current
    const clearCurrent=()=>{
        dispatch({type:CLEAR_CURRENT});
    }   
    return (<ContactContext.Provider
    value={{
        contacts:state.contacts,
        current:state.current,
        error:state.error,
        addContact,
        deleteContact,
        updateContact,
        clearCurrent,
        setCurrent,
        clearFilter,
        filterContact,
        getContact
    }}
    >
    {props.children}
    </ContactContext.Provider>)
};
export default ContactState;