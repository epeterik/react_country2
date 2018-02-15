import React, { Component } from 'react';
import '../ui-toolkit/css/nm-cx/main.css';
import '../css/custom.css';

//package imports
import { connect } from "react-redux";
import { 
    Link
    } from 'react-router-dom';

//App Imports
import { WaitSpinner } from '../components/waitSpinner';
import { setCountryAsTracked,
         setCountryAsUNtracked } from '../actions/actions';

class Country extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorText: '',
            showWaitSpinner: false
        }

        //bindings
        this.handleWaitSpinner = this.handleWaitSpinner.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleTrackCountryClick = this.handleTrackCountryClick.bind(this);
        this.trackedCountryFind = this.trackedCountryFind.bind(this);
    }

    handleWaitSpinner(displayTheWaitSpinner) {
        //console.log("Entering Country.handleWaitSpinner - Bool Value is: ", displayTheWaitSpinner);
        this.setState({showWaitSpinner: displayTheWaitSpinner});
        //console.log("Leaving Country.handleWaitSpinner");
    }

    handleError(errorEncountered) {
        //console.log("Entering Country.handleError"); //debug
        
        //update error state if an error was encountered during the axios call
        this.setState({errorText: errorEncountered});
        
        //console.log("Leaving Country.handleError"); //debug
    }

    handleTrackCountryClick(countryData) {
        console.log("Entering handleTrackCountryClick");
        this.props.trackCountry(countryData, this.handleWaitSpinner, this.handleError);
        console.log("Leaving handleTrackCountryClick");
    }

    handleUNTrackCountryClick(countryIsTrackedObject) {
        console.log("Entering handleUNTrackCountryClick");
        this.props.stopTrackingACountry(countryIsTrackedObject.id, this.handleWaitSpinner, this.handleError);
        console.log("Leaving handleUNTrackCountryClick");
    }

    trackedCountryFind(countryDataObject) {
        //console.log("Entering trackedCountryFind");
        //console.log(countryDataObject); //debug
        //console.log(this.props.blocCountryData); //debug

        //check if this country is in the tracked countries list
        return countryDataObject.alpha3Code === this.props.blocCountryData.alpha3Code ? true : false;
    }

    render() {
        //debug
        //console.log("Country Object Props: ", this.props); //comenting out as this triggers on every keystroke

        //store local value for easier typing
        let localCountryObject = this.props.blocCountryData;

        //lets check if this country is a tracked country
        let countryIsTracked = this.props.trackedCountries.find(this.trackedCountryFind);
        //console.log("trackedCountries value: ", countryIsTracked); //debug

        return (
            
            <div className="card padding-medium" key={"countryObjectRenderCard" + localCountryObject.numericCode} >
                {this.state.showWaitSpinner ?
                    <div className="text-center">
                        <h3>Logging Updated Country Tracking Status</h3>
                        <WaitSpinner />
                        <h4>Please be patient</h4>
                    </div>
                    :
                    <div> 
                        <div className="row">
                            <div className="small-3 columns tableDiv">
                                <img alt={localCountryObject.name + " flag"} src={localCountryObject.flag} height="150" width="255" border="1"/>
                            </div>
                            <div className="small-9 columns tableDiv">
                                <div className="row">
                                    <div className="small-3 columns">
                                        Country Name: 
                                    </div>
                                    <div className="small-9 columns">
                                        <Link to={"/countries/" + localCountryObject.name}>{ localCountryObject.name }</Link>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="small-9 columns">
                                        <div className="row">
                                            <div className="small-3 columns">
                                                Capital: 
                                            </div>
                                            <div className="small-9 columns">
                                                { localCountryObject.capital }
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="small-3 columns">
                                                Population: 
                                            </div>
                                            <div className="small-9 columns">
                                                { localCountryObject.population.toLocaleString() }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="small-3 columns">
                                        {countryIsTracked === undefined ?
                                            <button className="button btn-cta success small" onClick={() => this.handleTrackCountryClick(localCountryObject)}>Track</button>
                                         :
                                         this.props.canUntrack ?
                                            <button className="button btn-cta warning small" onClick={() => this.handleUNTrackCountryClick(countryIsTracked)} disabled={!this.props.canUntrack}>Untrack</button>
                                            :
                                            <button className="button btn-cta warning small" onClick={() => alert("Please go to the Tracked Countries page to untrack this country.")} disabled={!this.props.canUntrack}>Tracked</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>

        ); //end return

    } //end render

} //end NoteEntry

const mapStateToProps = (state) => {
    return {
        trackedCountries: state.trackedCountriesList
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
      return {
            trackCountry: (localCountryData, waitFlag, errorFunction) => {
                dispatch(setCountryAsTracked (localCountryData, waitFlag, errorFunction))
            },
            stopTrackingACountry: (deleteId, waitFlag, errorFunction) => {
                dispatch(setCountryAsUNtracked (deleteId, waitFlag, errorFunction))
            }
      };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Country);