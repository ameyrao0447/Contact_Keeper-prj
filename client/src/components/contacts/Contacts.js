import React, {useContext,Fragment, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItems';
const Contact = ()=>{
    const contactContext=useContext(ContactContext);
    const {contacts,filtered,getContact}=contactContext;
    useEffect(()=>{
        getContact();
    },[])
    
    if(contacts!==null&&contacts.length===0){
        return (<h4> Please Add contact </h4>)
    }
    return (
        <Fragment>
            {filtered==null &&  contacts.map(contact =>(
            <ContactItem contact={contact} key={contact._id} />   
            ))}
            {filtered && filtered.map(contact =>(
            <ContactItem contact={contact} key={contact._id} />   
            ))}
        </Fragment>
    );
}
export default Contact