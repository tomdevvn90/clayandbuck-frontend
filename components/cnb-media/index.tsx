import React from "react";
import CnbMediaApp from "./CnbMediaApp";

export default function CnbMedia() {
    const props = JSON.parse('{"pwsHost":"services.premierenetworks.com","showSlug":"clay-and-buck","pageSlug":"videos","isAuthenticated":false}');
    return (
        // <div>Here is videos</div>
        <CnbMediaApp {...props} />
    )
}