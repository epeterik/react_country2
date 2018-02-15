import React from 'react';
import '../ui-toolkit/css/nm-cx/main.css';

import { 
    Link,
    Route,
    } from 'react-router-dom';

//Use for horizontal rendering
export const OldSchoolMenuLink = ({ label, to, activeOnlyWhenExact }) => (
    <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
      <div className={'heading-nav-entry' + (match ? ' active' : '')}>
        <Link to={to}>{label}</Link>
      </div>
    )}/>
  )

//Use for vertical nav bar rendering
export const ShowActiveSideBarListLink = ({ label, to, activeOnlyWhenExact, arrayIndex }) => (
    <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
      <li className={'filter-nav-entry' + (match ? ' active' : '')} key={"blockListItem" + arrayIndex} id={"blockListItem" + arrayIndex} >
        <Link to={to}>{label}</Link>
      </li>
    )}/>
  )

//Use for vertical nav bar rendering
export const ShowActiveSideBarListLinkWithTooltip = ({ label, to, activeOnlyWhenExact, arrayIndex, toolTipText }) => (
  <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
    <li className={'filter-nav-entry' + (match ? ' active' : '')} key={"blockListItem" + arrayIndex} id={"blockListItem" + arrayIndex} title="test here">
      <Link to={to} title={toolTipText}>{label}</Link>
    </li>
  )}/>
)
