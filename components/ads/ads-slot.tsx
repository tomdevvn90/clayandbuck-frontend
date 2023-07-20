// import { useEffect, useState } from 'react'
// import { adDevice } from "./lib/dfp/const"

export default function AdSlot (props) {
    //   const [showAdd, setShowAdd] = useState(false)
    //   useEffect(() => {
    //     if ((window.screen.width < 768 && adDevice[id] !== "d") || 
    //         (window.screen.width >= 768 && adDevice[id] !== "m"))
    //           setShowAdd(true)
        
    //     return () => {}
    //   }, [])

    const { id, customStyle } = props
    return (
        //showAdd ? <div id={id} style={customStyle} /> : <></>
        <div className="text-center" id={id} style={customStyle} />
    )
}