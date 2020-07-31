import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';
const Alerts =()=>{
    const alertContext=useContext(AlertContext);
    return (
        alertContext.alerts.length > 0 && 
        alertContext.alerts.map(x=>(
            <div key={x.id} className={`alert alert-${x.type}`}>
                <i className='fas fa-info-circle'/>{x.msg} 
            </div>
        ))
    );

}
export default Alerts;