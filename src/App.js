//package imports
import React, { Component } from 'react';
import { 
    BrowserRouter,
    Route
    } from 'react-router-dom';

//css imports
import './ui-toolkit/css/nm-cx/main.css';
import './css/custom.css';

//app imports
import { DefaultNavigationBar } from './components/defaultNavBar';
import { EconomicBlockNavLinks } from './components/renderEconBlocks';
import { DefaultAppHome } from './components/defaultHome';
import BlockMembership from './containers/blockMembership';
import TrackedCountries from './containers/trackedCountries';
import CountryDetail from './containers/countryDetail';


class App extends Component {
  render() {
    return (
      <div className="bg-off-white padding-medium">
          <h1 className="padding-bottom-medium">React Countries</h1>
          <BrowserRouter>
            <div className="card padding-none">
                <div className="row padding-horiz-medium">
                    <div className="columns small-2 padding-top-medium">
                        <ul className="filter-nav vertical">
                            <Route path="/" component={ DefaultNavigationBar } />
                            <Route exact path="/" component={ EconomicBlockNavLinks } />
                            <Route exact path="/:economicBlock" component={ EconomicBlockNavLinks } />                            
                        </ul>
                    </div>
                    <div className="columns small-10 padding-vert-medium">    
                        <Route exact path="/" component={ DefaultAppHome } />    
                        <Route exact path="/:economicBlock" component={ BlockMembership } />
                        <Route exact path="/countries/:countryName" component={ CountryDetail } /> 
                        <Route exact path="/tracking/countries" component={ TrackedCountries } />             
                    </div>
                </div>
            </div>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
