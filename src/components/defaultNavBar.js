//package imports
import React from 'react';

//CSS imports
import '../ui-toolkit/css/nm-cx/main.css';
import '../css/custom.css';

//app imports
import { ShowActiveSideBarListLink } from './setActiveNavLinks.js';

export const DefaultNavigationBar = (props) => {
    return (
        <div>
            <h6>App Navigation</h6>
            <ShowActiveSideBarListLink label={"Home"} to={"/"} activeOnlyWhenExact={true} arrayIndex={"Home_Link"} key={"HomeLink"}/>
            <ShowActiveSideBarListLink label={"Tracking"} to={"/tracking/countries"} activeOnlyWhenExact={true} arrayIndex={"Tracking_Link"} key={"TrackingLink"}/>
        </div>
    );
}
