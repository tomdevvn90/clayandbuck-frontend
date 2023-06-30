
export interface StationsPageProps{

}

export default function StationsPage( props: StationsPageProps ) {
    return (
        <>
        <h1>WHERE TO LISTEN</h1>

        <div id="ihrAffiliatesMapContainer"></div>
        <script src="https://htl.radioedit.iheart.com/static/stations/map.js"></script>
        {/* <script>
            ihrAffiliatesMap.initAffiliatesMap({
                show_name: 'clay-travis-buck-sexton',
            });
        </script> */}
        </>
    )
}