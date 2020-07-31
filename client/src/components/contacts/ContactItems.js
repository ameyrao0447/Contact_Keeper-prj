import React, {useContext} from 'react'
import ContactContext from '../../context/contact/contactContext';

import PropsTypes from 'prop-types';
const ContactItems = ({contact})=>{
    const contactContext=useContext(ContactContext);
    const {deleteContact,setCurrent,clearCurrent}=contactContext;
    const {_id,name,email,phone,type}=contact; 
    
    const onDelete=()=>{
        deleteContact(_id);
        clearCurrent();
    }
    
    const onEdit=()=>{
        setCurrent(contact);
    }
    return (
        <div className='card bg-light'>
            <h3 className='text-primary text-left'>
                {name}{' '}
                <span style={{float:"right"}}
                 className={'badge '+(type==='professional' ? 'badge-success' : 'badge-primary')}>
                {type.charAt(0).toUpperCase()+type.slice(1)}
                </span>
            </h3>
            <ul className='list'>
                {email && (<li>
                    <i className="fas fa-envelope-open" ></i> {email}
                </li>)}
                {phone && (<li>
                    <i className="fas fa-phone" ></i> {phone}
                </li>)}
            </ul>
            <p>
                <button onClick={onEdit}  className='btn btn-dark btn-sm'>Edit</button>
                <button onClick={onDelete} className='btn btn-danger btn-sm'>Delete</button>
            </p>
        </div>
    );
}
ContactItems.propsTypes={
    contact:PropsTypes.object.isRequired
}
export default ContactItems;