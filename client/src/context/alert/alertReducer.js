import { SET_ALERT,REMOVE_ALERT } from '../types';
const alertReducer=(state,action)=>{
    switch(action.type)
    {
        case REMOVE_ALERT:
            return(
                state.filter(x=>x.id!==action.payload)
            );
        case SET_ALERT:
            return(
                [...state,action.payload]
            );
        default:
            return state;
    }
}
export default alertReducer;