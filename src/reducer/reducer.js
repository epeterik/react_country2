//app imports
import { UPDATE_TRACKED_COUNTRIES, 
         UPDATE_ECONOMIC_BLOCK_COUNTRIES,
         UPDATE_TRACKED_COUNTRIES_LIST } from '../actions/types';

export const reducer = (state, action) => {

console.log("Entering Reducer");

switch (action.type) {
    case UPDATE_TRACKED_COUNTRIES: 
    console.log("reducer - UPDATE_TRACKED_COUNTRIES");
    state = {...state, 
                trackedCountries: action.payload};
    return state; 
    case UPDATE_TRACKED_COUNTRIES_LIST: 
    console.log("reducer - UPDATE_TRACKED_COUNTRIES_LIST");
    state = {...state, 
                trackedCountriesList: action.payload};
    return state; 
    case UPDATE_ECONOMIC_BLOCK_COUNTRIES: 
    console.log("reducer - UPDATE_ECONOMIC_BLOCK_COUNTRIES");
    state = {...state, 
                economicBlockMemberCountries: action.payload};
    return state; 
    default: //if no case is caught, return the current unmodified state
    console.log("reducer - default");
    return state; 

    } //end switch

} //end of reducer

//only exporting one element as the default element
export default reducer;