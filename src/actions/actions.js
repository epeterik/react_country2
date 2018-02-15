//package imports
import axios from 'axios';

//app imports
import { UPDATE_TRACKED_COUNTRIES,
         UPDATE_ECONOMIC_BLOCK_COUNTRIES,
         UPDATE_TRACKED_COUNTRIES_LIST } from './types';


//used for updating just the single array/list of tracked countries
export function updateTrackedCountriesList(trackedCountryList) {
    return {
        type: UPDATE_TRACKED_COUNTRIES_LIST,
        payload: trackedCountryList
    }
}

//used for storing country data based on the tracked country list
export function updateTrackedCountriesData(trackedCountryData) {
    return {
        type: UPDATE_TRACKED_COUNTRIES,
        payload: trackedCountryData
    }
}

//used for storing country data based on the tracked country list
export function updateEconomicBlockCountiresData(economicBlockCountries) {
    return {
        type: UPDATE_ECONOMIC_BLOCK_COUNTRIES,
        payload: economicBlockCountries
    }
}

export function getListEconomicBlockNations (econBlocName, waitFlag, errorFunction)
{
    console.log("Entering getListEconomicBlockNations");

    //specify local RestCountries.eu API path for obtaining a regional blocks data
    //   Docs @: https://restcountries.eu/#api-endpoints-regional-bloc
    let mockAPIPath = "https://restcountries.eu/rest/v2/regionalbloc/";

    return (dispatch) => {
        //set state var to turn on the loading/wait spinner
        dispatch(() => waitFlag(true));

        //lets get that list of notes!
        axios.get(mockAPIPath + econBlocName)
            .then((response) => {
                //Success!! :)
                console.log("getListEconomicBlockNations - response for " + econBlocName + ": ", response);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //get tracked countries list - will ALWAYS be called
                dispatch(getTrackedCountriesList(waitFlag, errorFunction, false))

                //update store with list of users
                dispatch(updateEconomicBlockCountiresData(response.data));

            })
            .catch((error) => {
                //Failure!
                console.log("FAILED to getListEconomicBlockNations :( - error: ", error);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //update state indicating error
                //display encountered error
                dispatch(() => errorFunction('Error getting list of member countries in economic block from RESTCountries API , Try Again'));
            })

    } //end return

} //end of getListEconomicBlockNations

export function getTrackedCountriesList (waitFlag, errorFunction, getTrackedCountriesCountryData)
{
    console.log("Entering getTrackedCountriesList");

    const mockAPIPath = "http://5a85c9d6085fdd00127042d2.mockapi.io/reactTrackedCountryList";

    return (dispatch) => {
        //set state var to turn on the loading/wait spinner
        dispatch(() => waitFlag(true));

        //lets get that list of notes!
        axios.get(mockAPIPath)
            .then((response) => {
                //Success!! :)
                console.log("getTrackedCountriesList - response: ", response);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //update store with list of users
                dispatch(updateTrackedCountriesList(response.data));

                console.log(getTrackedCountriesCountryData); //debug

                //if supplied with an optional success function, call with returned data
                //  this is needed for the tracked countries page
                if (getTrackedCountriesCountryData === true)
                {
                    dispatch(getTrackedCountriesData(response.data, waitFlag, errorFunction));
                }

                //fix defect where error data is not cleared between failed and successful calls
                dispatch(() => errorFunction(''));
            })
            .catch((error) => {
                //Failure!
                console.log("FAILED to getTrackedCountriesList :( - error: ", error);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //update state indicating error
                //display encountered error
                dispatch(() => errorFunction('Error getting tracked country data from MockAPI, Try Again'));
            })

    } //end return

} //end of getTrackedCountriesList

export function getTrackedCountriesData (trackedNationList, waitFlag, errorFunction)
{
    console.log("Entering getTrackedCountriesData");

    //specify local RestCountries.eu API path for obtaining a regional blocks data
    //   Docs @: https://restcountries.eu/#api-endpoints-name
    let mockAPIPath = "https://restcountries.eu/rest/v2/alpha?codes=";
    //map array to an array of strings (which it is), the seperate values by a semicolon
    let mockAPIPathForCall = mockAPIPath + trackedNationList.map((arrObject) => {return arrObject.alpha3Code}).join(";");

    console.log(mockAPIPathForCall);

    return (dispatch) => {
        //check if we need to even make a call, ie if the tracked nations list has 
        //  a length of zero, we set an empty array to state
        if (trackedNationList.length === 0)
        {
            dispatch(updateTrackedCountriesData([]));
            return; // no need to go no further
        }

        //set state var to turn on the loading/wait spinner
        dispatch(() => waitFlag(true));

        //lets get that list of notes!
        axios.get(mockAPIPathForCall)
            .then((response) => {
                //Success!! :)
                console.log("getTrackedCountriesData : ", response);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //update store with list of users
                dispatch(updateTrackedCountriesData(response.data));

                //fix defect where error data is not cleared between failed and successful calls
                dispatch(() => errorFunction(''));
            })
            .catch((error) => {
                //Failure!
                console.log("FAILED to getTrackedCountriesData :( - error: ", error);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //update state indicating error
                //display encountered error
                dispatch(() => errorFunction('Error getting list of tracked countries from RESTCountries API , Try Again'));
            })

    } //end return

} //end of getListEconomicBlockNations

export function setCountryAsTracked (countryData, waitFlag, errorFunction)
{
    console.log("Entering setCountryAsTracked");

    //specify local MockAPI Path for storing countries to track
    let mockAPIPath = "http://5a85c9d6085fdd00127042d2.mockapi.io/reactTrackedCountryList";

    return (dispatch) => {
        //set state var to turn on the loading/wait spinner
        dispatch(() => waitFlag(true));

        //create local country object to send to MockAPI
        let localCountryObject = {
            countryName: countryData.name,
            numericCode: countryData.numericCode,
            alpha3Code: countryData.alpha3Code
        }

        //lets get that list of notes!
        axios.post(mockAPIPath, localCountryObject)
            .then((response) => {
                //Success!! :)
                console.log("setCountryAsTracked - response for " + countryData.countryName + ": ", response);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //update store with list of users
                dispatch(getTrackedCountriesList(waitFlag, errorFunction, false));

                //fix defect where error data is not cleared between failed and successful calls
                dispatch(() => errorFunction(''));
            })
            .catch((error) => {
                //Failure!
                console.log("FAILED to setCountryAsTracked :( - error: ", error);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //update state indicating error
                //display encountered error
                dispatch(() => errorFunction('Error sending country data to MockAPI, Try Again'));
            })

    } //end return

} //end of setCountryAsTracked

export function setCountryAsUNtracked (deleteId, waitFlag, errorFunction)
{
    console.log("Entering setCountryAsUNtracked");

    //specify local MockAPI Path for storing countries to track
    let mockAPIPath = "http://5a85c9d6085fdd00127042d2.mockapi.io/reactTrackedCountryList";

    return (dispatch) => {
        //set state var to turn on the loading/wait spinner
        dispatch(() => waitFlag(true));

        //lets get that list of notes!
        axios.delete(mockAPIPath + "/" + deleteId)
            .then((response) => {
                //Success!! :)
                console.log("setCountryAsUNtracked - response for deletion ID " + deleteId + ": ", response);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //update store with list of users
                dispatch(getTrackedCountriesList (waitFlag, errorFunction, true));

                //fix defect where error data is not cleared between failed and successful calls
                dispatch(() => errorFunction(''));
            })
            .catch((error) => {
                //Failure!
                console.log("FAILED to setCountryAsUNtracked :( - error: ", error);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //update state indicating error
                //display encountered error
                dispatch(() => errorFunction('Error deleting a country from MockAPI, Try Again'));
            })

    } //end return

} //end of setCountryAsUNtracked

export function getCountryData (countryName, waitFlag, errorFunction, foundCountryData)
{
    console.log("Entering getCountryData");

    //specify local RestCountries.eu API path for obtaining specific country data
    //   Docs @: https://restcountries.eu/rest/v2/name/aruba?fullText=true
    let mockAPIPath = "https://restcountries.eu/rest/v2/name/";

    return (dispatch) => {
        //set state var to turn on the loading/wait spinner
        dispatch(() => waitFlag(true));

        //lets get that list of notes!
        axios.get(mockAPIPath + countryName + "?fullText=true")
            .then((response) => {
                //Success!! :)
                console.log("getCountryData - response for " + countryName + ": ", response);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //update store with list of users
                //   - Doing this as callback as we want to ensure each time the page loads
                //     we get fresh data - if data goes to the store there is the risk that 
                //     it could persist when we do not want it to. 
                dispatch(() => foundCountryData(response.data));

                //fix defect where error data is not cleared between failed and successful calls
                dispatch(() => errorFunction(''));
            })
            .catch((error) => {
                //Failure!
                console.log("FAILED to getCountryData :( - error: ", error);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //update state indicating error
                //display encountered error
                dispatch(() => errorFunction('Error getting country data from RESTCountriesAPI, Try Again'));
            })

    } //end return

} //end of getCountryData