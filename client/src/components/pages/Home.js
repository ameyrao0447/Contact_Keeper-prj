import React, { useEffect,useContext } from 'react'
import Contacts from '../contacts/Contacts'
import ContactForm from '../contacts/ContactForm'
import ContactFilter from '../contacts/ContactFilter'
import AuthContext from '../../context/auth/authContext'
const Home =()=>{
    const authContext=useContext(AuthContext);
    useEffect(()=>{
        authContext.loaduser();

        console.log(authContext.user);
        console.log(authContext.token)
    },[])
    return (
        <div className='grid-2'>
            <div>
                <ContactForm/>
            </div>
            <div>
                <ContactFilter/>
                <Contacts/>
            </div>
        </div>
    );
}
export default Home;