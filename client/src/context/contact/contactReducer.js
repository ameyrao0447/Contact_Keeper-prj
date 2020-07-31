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
export default (state,action)=>{
    switch(action.type)
    {
        case ADD_CONTACT:
            return{
                ...state,
                contacts:[action.payload,...state.contacts],
            };
        case DELETE_CONTACT:
            return{
                ...state,
                contacts:state.contacts.filter(x=>x._id!==action.payload)
            }
        case SET_CURRENT:
            return{
                ...state,
                current:action.payload
            };
        case CLEAR_CURRENT:
            return{
                ...state,
                current:null
            }    
        case UPDATE_CONTACT:
            return{
                ...state,
                contacts:state.contacts.map(x=>x._id===action.payload._id?action.payload:x)
            }
        case FILTER_CONTACT:
            return{
                ...state,
                filtered:state.contacts.filter(x=>x.name.include(action.payload)
                                               ||x.email.include(action.payload))
            }
        case CLEAR_FILTER:
            return{
                ...state,
                filtered:null
            }
        case CONTACT_ERRORS:
            return {
                ...state,
                error:action.payload
            }
        case GET_CONTACT:
            return {
            ...state,
            contacts:action.payload
            }
        default:
            return state;
    }
}