import React from "react";
import CnbMediaApp from "./CnbMediaApp";

export default function CnbMedia( {cnbMediaData} ) {
    const props = JSON.parse('{"pwsHost":"services.premierenetworks.com","showSlug":"clay-and-buck","pageSlug":"videos","isAuthenticated":false}');
    return (
        <CnbMediaApp {...props} />
    )
}