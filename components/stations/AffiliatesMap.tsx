import { useScript } from 'usehooks-ts'
import { useEffect } from 'react'
import Script from 'next/script'

declare const ihrAffiliatesMap: any
interface afMapObj {
    show_name: string
}

export default function AffiliatesMap() {
    const afMap: afMapObj = {
        show_name: 'clay-travis-buck-sexton'
    }
    const status = useScript(`https://htl.radioedit.iheart.com/static/stations/map.js`, {
        removeOnUnmount: false,
    })
    useEffect(() => {
        if (typeof ihrAffiliatesMap !== 'undefined') {
            if ( status === 'ready' ) {
                ihrAffiliatesMap.initAffiliatesMap( afMap );
            }
        }
    }, [status])

    return (
        <>
        <div id="ihrAffiliatesMapContainer"></div>
        </>
    )
}