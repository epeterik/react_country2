import React, { Component } from 'react';
import '../ui-toolkit/css/nm-cx/main.css';
import '../css/custom.css';

//package imports
import { connect } from "react-redux";

//App Imports
import { WaitSpinner } from '../components/waitSpinner';
import { getCountryData } from '../actions/actions';

class CountryDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorText: '',
            showWaitSpinner: false,
            contryDataToDisplay: undefined
        }

        //bindings
        this.handleWaitSpinner = this.handleWaitSpinner.bind(this);
        this.handleError = this.handleError.bind(this);
        this.updateCountryData = this.updateCountryData.bind(this);

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

    updateCountryData(countryDataIn) {
        console.log("Entering updateCountryData");
        this.setState({contryDataToDisplay: countryDataIn[0]});
        console.log("Leaving updateCountryData");
    }

    componentDidMount() {
        console.log("BlockMemberDisplay - componentDidMount");

        //If sent to this page with no props (no :economicBlock) do not perform lookup (lookup will fail with no val)
        if (this.props.match.params.countryName.trim() !== "")
        {
            this.props.getCountryData(this.props.match.params.countryName, this.handleWaitSpinner, this.handleError, this.updateCountryData);
        }
    }

    componentDidUpdate(prevProps) {
        //console.log("BlockMemberDisplay - componentDidUpdate - New Props:", prevProps, "Current Props: ", this.props);
        if (prevProps.match.params.countryName.trim() !== this.props.match.params.countryName.trim())
        {
            //debug
            console.log("BlockMemberDisplay - Props changed from: ", prevProps.match.params.economicBlock, "to: ", this.props.match.params.economicBlock);
            //If sent to this page with no props (no :economicBlock) do not perform lookup (lookup will fail with no val)
            if (prevProps.match.params.countryName.trim() !== "")
            {
                this.props.getCountryData(this.props.match.params.countryName, this.handleWaitSpinner, this.handleError, this.updateCountryData);
            }
        }
    }

    mapCurrencies(currencyObject, arrayIndex) {
        return (
            <div className="row" key={"currencyRow" + arrayIndex}>
                <div className="small-6 columns" key={"currencyName" + arrayIndex}>
                    { currencyObject.name }
                </div>
                <div className="small-6 columns" key={"currencySymbol" + arrayIndex}>
                    { currencyObject.symbol }
                </div>
            </div>
        );
    }

    mapLanguages(languageObject, arrayIndex) {
        //create seperator to prepent to returned language values if there is more than one
        //  this gives us the comma's between the listed languages
        let languageSeperator = arrayIndex > 0 ? ", " : "";

        return (
            <span key={"languageVal" + arrayIndex}>
                { languageSeperator + languageObject.name + " (" + languageObject.nativeName + ")" }
            </span>
        );
    }

    render() {
        //debug
        //console.log("Country Object Props: ", this.props); //comenting out as this triggers on every keystroke

        let localCountryObject = this.state.contryDataToDisplay

        console.log(localCountryObject);

        return (
            
            <div className="card padding-medium" >
                {this.state.showWaitSpinner || localCountryObject === undefined ?
                    <div className="text-center">
                        <h3>Logging Updated Country Tracking Status</h3>
                        <WaitSpinner />
                        <h4>Please be patient</h4>
                    </div>
                    :
                    <div> 
                        <h1>{ localCountryObject.name }</h1>
                        <div className="row">
                            <div className="small-2 columns">
                                Capital: 
                            </div>
                            <div className="small-10 columns">
                                { localCountryObject.capital }
                            </div>
                        </div>
                        <div className="row">
                            <div className="small-2 columns">
                                Currencies:
                            </div>
                            <div className="small-10 columns">
                                <div className="row">
                                    <div className="small-6 columns">
                                        Name:
                                    </div>
                                    <div className="small-6 columns">
                                        Symbol:
                                    </div>
                                </div>
                                { localCountryObject.currencies.map(this.mapCurrencies) }
                            </div>
                        </div>
                        <div className="row">
                            <div className="small-2 columns">
                                Languages:
                            </div>
                            <div className="small-10 columns">
                                { localCountryObject.languages.map(this.mapLanguages) }
                            </div>
                        </div>
                        <div className="row">
                            <div className="small-2 columns">
                                Population:
                            </div>
                            <div className="small-10 columns">
                                { localCountryObject.population.toLocaleString() }
                            </div>
                        </div>
                        <div className="row">
                            <div className="small-2 columns">
                                Flag:
                            </div>
                            <div className="small-10 columns">
                                <img alt={ localCountryObject.name + " flag" } src={ localCountryObject.flag } height="300" width="510" border="1"/>
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
        //probably not getting data from store, but leaving stubbed in just in case
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
      return {
            getCountryData: (countryName, waitFlag, errorFunction, foundCountryData) => {
                dispatch(getCountryData (countryName, waitFlag, errorFunction, foundCountryData))
        } 
      };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(CountryDetail);