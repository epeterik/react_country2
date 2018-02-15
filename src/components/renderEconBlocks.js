//package imports
import React from 'react';

//CSS imports
import '../ui-toolkit/css/nm-cx/main.css';
import '../css/custom.css';

//app imports
import { ShowActiveSideBarListLinkWithTooltip } from './setActiveNavLinks';

//Block Details API Call to: https://restcountries.eu/rest/v2/regionalbloc/
const listOfBlocs = [{acronym: "EU", name: "European Union"},
                     {acronym: "EFTA", name: "European Free Trade Association"},
                     {acronym: "CARICOM", name: "Caribbean Community"},
                     {acronym: "PA", name: "Pacific Alliance"},
                     {acronym: "AU", name: "African Union"},
                     {acronym: "USAN", name: "Union of South American Nations"},
                     {acronym: "EEU", name: "Eurasian Economic Union"},
                     {acronym: "AL", name: "Arab League"},
                     {acronym: "ASEAN", name: "Association of Southeast Asian Nations"},
                     {acronym: "CAIS", name: "Central American Integration System"},
                     {acronym: "CEFTA", name: "Central European Free Trade Agreement"},
                     {acronym: "NAFTA", name: "North American Free Trade Agreement"},
                     {acronym: "SAARC", name: "South Asian Association for Regional Cooperation"}
                    ];

//render links out as NM formatted sidebar links
function mapListOfBlocksNavBarWithLINK(blocObject, arrayIndex) {
    return (
        <ShowActiveSideBarListLinkWithTooltip label={blocObject.acronym} to={"/" + blocObject.acronym} activeOnlyWhenExact={true} arrayIndex={arrayIndex} key={"economicBlocsListItem" + arrayIndex} toolTipText={blocObject.name}/>
    );
}

//return header with economic block array mapped as economic blocks
export function EconomicBlockNavLinks()
{
    return (
        <div>
            <h6>Regional Blocks</h6>
            { listOfBlocs.map(mapListOfBlocksNavBarWithLINK) }
        </div>
    )
}