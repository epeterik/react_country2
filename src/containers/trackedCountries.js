//app imports
import React, { Component } from 'react';
import { connect } from "react-redux";

//css imports
import '../ui-toolkit/css/nm-cx/main.css';
import '../css/custom.css';

//App Imports
import { WaitSpinner } from '../components/waitSpinner';
import { getTrackedCountriesList } from '../actions/actions';
import Country from './country';

class TrackedCountries extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorText: '',
            showWaitSpinner: false
        }

        //bindings
        this.handleWaitSpinner = this.handleWaitSpinner.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    handleWaitSpinner(displayTheWaitSpinner) {
        //console.log("Entering noteEntry.handleWaitSpinner - Bool Value is: ", displayTheWaitSpinner);
        this.setState({showWaitSpinner: displayTheWaitSpinner});
        //console.log("Leaving noteEntry.handleWaitSpinner");
    }

    handleError(errorEncountered) {
        //console.log("Entering noteEntry.handleError"); //debug
        
        //update error state if an error was encountered during the axios call
        this.setState({errorText: errorEncountered});
        
        //console.log("Leaving noteEntry.handleError"); //debug
    }

    componentDidMount() {
        console.log("TrackedCountries - componentDidMount");

        this.props.listOfTrackedCountries(this.handleWaitSpinner, this.handleError, true);
    }

    mapMyEconomicBlockCountries(countryObject, arrayIndex) {
        return (
            <div key={"countryRow" + arrayIndex}>{countryObject.name}</div>
        ); 
    }

    mapMyTrackedCountires(countryObject, arrayIndex) {
        return (
            <tr key={"blockMemberRowFor" + countryObject.name}>
                <td key={"blockMemberDataFor" + countryObject.name}>
                    <Country blocCountryData={countryObject} key={"TrackedCountries" + countryObject.name} canUntrack={true} />
                </td>
            </tr>
        ); 
    }

    sortTrackedCountries(firstCountry, secondCountry) {
        //console.log(firstCountry, secondCountry); //debug
        if (firstCountry.name <= secondCountry.name)
            return -1;
        else if (firstCountry.name === secondCountry.name)
            return 0;
        else
            return 1;
    }


    render() {
        //debug
        //console.log("TrackedCountries Props: ", this.props); //comenting out as this triggers on every keystroke

        //Error handling, check to see if the notes array has been loaded
        if (this.props.trackedCountriesData.length === 0)
        {
            return <div>No tracked countries to display.</div>
        }

        //console.log("Tracked countries before sort: ", this.props.trackedCountriesData); //debug
        let localSortedCountriesArray = this.props.trackedCountriesData.slice().sort(this.sortTrackedCountries);
        //console.log("Tracked Countries after sort: ", localSortedCountriesArray);//debug

        return (
            
            <div className="card padding-medium">
                {this.state.showWaitSpinner ?
                    <div className="text-center">
                        <h3>Getting List of Tracked Countries</h3>
                        <WaitSpinner />
                        <h4>Please be patient</h4>
                    </div>
                    :
                    <div>
                        <h1 className="text-center">{this.props.match.params.economicBlock}</h1>
                        <table className="table scrollable">
                            <tbody style={{height: "500px"}}>
                                { localSortedCountriesArray.map(this.mapMyTrackedCountires) }
                            </tbody>
                        </table>
                    </div>
                }
            </div>

        ); //end return

    } //end render

} //end NoteEntry

const mapStateToProps = (state) => {
    return {
        trackedCountriesData: state.trackedCountries
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
      return {
                listOfTrackedCountries: (waitFlag, errorFunction, lookupCountryData) => {
                    dispatch(getTrackedCountriesList(waitFlag, errorFunction, lookupCountryData))
            }
      };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(TrackedCountries);
