import React, { useEffect, useState ,useRef} from 'react';
import SpotifyPlayer from "react-spotify-web-playback"
const WebPlayBack = () => {
    
        const [play,setPlay] = useState()
        const playRef = useRef()

        return (
          <>

       <SpotifyPlayer
  token="BQBYwCfPK1iADS12Qx9aunbno0feUV2E0cedsb-3OLlyseMKk1QqqY_ji7sJbxYnDbhGarrK7cCMljNvEGtwCs0sVLKc6TAHjQIJDrxWuoyZOSoEt3hgHMVa-jFhUWdPMLbigKRFFaD7BqhFHePV2q-JtFyMzokIpYo6P6OkP69jYXUEcKWyTBxuNFNNLrNXIHWSurvAvMTOWvCMFUwlEUIpW1vI"
  uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']}
  styles={{
    bgColor: '#333',
    color: '#fff',
    loaderColor: '#fff',
    sliderColor: '#1cb954',
    savedColor: '#fff',
    trackArtistColor: '#ccc',
    trackNameColor: 'transparent',
  }}
/>;
          </>
        );
};

export default WebPlayBack;