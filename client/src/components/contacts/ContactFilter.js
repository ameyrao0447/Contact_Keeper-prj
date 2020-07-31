import React, { useRef, useEffect, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';
const ContactFilter=()=>{
   const text=useRef('');
   
   const contactContext=useContext(ContactContext);
   const {filtered,filterContact,clearFilter}=contactContext;
   useEffect(()=>{
       if(filtered===null)
       {
           text.current.value='';
       }
   });
   const onChange=(e)=>{
       if(text.current.value!=='')
       {
           filterContact(e.target.value);
       }
       else
       {
           clearFilter();
       }
   }
    return (
        <form>
            <input ref={text} type="text" onChange={onChange}/> 
        </form>
    );

}
export default ContactFilter;