import React, {useContext,useState, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext';
const ContactForm=()=>{
    const contactContext=useContext(ContactContext); 

    const {addContact,current,clearCurrent,updateContact}=contactContext;

    const [contact,setContact]=useState({
        name:'',
        email:'',
        type:'personal',
        phone:''
    });

    useEffect(()=>{
        if(current!==null)
        setContact(current);
        else
        {
            setContact({
                name:'',
                email:'',
                type:'personal',
                phone:''
            });    
        }
        console.log(current);
    },[current,contactContext]);
    const {name ,email,type,phone}=contact;
    
    const onChange=e=>{
        setContact({...contact,[e.target.name]:e.target.value});
    }
    const onSubmit=e=>{
        e.preventDefault();
        if(current===null)
        {
            addContact(contact);
            setContact({
                name:'',
                email:'',
                type:'personal',
                phone:''
            });
        }
        else
        {
            updateContact(contact);
            clearCurrent();
        }
    }
    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{!current?'Add Contact Form':'Edit Contact Form'}</h2>
            <input type="text"
            name="name"
            value={name}
            onChange={onChange}/>
            
            <input type="email"
            name="email"
            value={email}
            onChange={onChange}/>

            <input type="text"
            name="phone"
            value={phone}
            onChange={onChange}/>

            <input type="radio"
            name="type"
            value="personal"
            checked={type==='personal'}
            onChange={onChange}/>
            Personal{' '}

            <input type="radio"
            name="type"
            value="professional"
            checked={type==='professional'}
            onChange={onChange}/>
            Professional
            
            <div>
            <input type="submit"  value={!current?"Add Contact":'Edit Contact'} className="btn btn-primary btn-block"/>
            </div>           
        </form>
    );
}
export default ContactForm;