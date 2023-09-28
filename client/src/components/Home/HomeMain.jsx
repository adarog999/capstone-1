import axios from "axios";
import { useEffect , useState} from "react";
import '../../assets/css/home/TopResult.css'
import List from "./List";
const HomeMain = () => {
    const [loading,setLoading] = useState("Loading")
    const [topResult,setTopResult] = useState([])
    const [isLoad,setLoad] = useState("flex")
    const [recommend,setRecommend] = useState(null)
      const [state,setState] = useState([
        'asd','asd','asd','asd',''
      ])
    const options = {
        method: 'GET',
        url: 'https://spotify23.p.rapidapi.com/search/',
        params: {
          q: 'PH',
          type: 'multi',
          offset: '0',
          limit: '6',
          numberOfTopResults: '5'
        },
        headers: {
          'X-RapidAPI-Key': '0e6631cb71msh89af0bed2653003p1ee4fcjsn7d6287cd5a50',
          'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
      };
            useEffect(() => {
                    axios.get("http://localhost:5000/api/home_tracks")
                    .then(res => {
                        setTopResult(res.data.tracks)
                        setLoad("none")
                        // console.log(res.data.artistData.artists)
                    })  
                    .catch(err => {
                        console.log(err)
                    })
            },[0])
            useEffect(() => {
              axios.get("http://localhost:5000/api/home_tracks")
              .then(res => {
                  setRecommend(res.data.tracks)
                  // console.log(res.data.artistData.artists)
              })  
              .catch(err => {
                  console.log(err)
              })
      },[0])
  return (
    <section className="topResult">
        {/* <div className='loader-parent'>
    <span className="loader"></span>
    </div> */}
    <div className="result-parent">
    <div className="loading-result" style={{display:isLoad}}>
    {
        state.map((key,index) => (
            <div key={index} className="card-box loading">
        </div>
        ))
    }
    </div>
    {topResult.map((key,index) => (
        <a key={index} href={`dashboard?page=asd&selectedTrack=${key.id}`} className="card-box">
            <div className="image">
                <img src={key.album.images[0].url} alt="" />
            </div>
            <span className="name">{key.artists[0].name}</span>
            <div className="followers">
            <span style={{marginLeft: "0px"}}>{key.album.name.length >= 10 ? key.album.name.slice(0,10)+ "..." : key.album.name}</span>
            </div>
        </a>
            ))
        }
    </div>
    <div className="list-main">
    {recommend && recommend.map((key,index) => (
        <List key={index} info={key} />
    ))}
    </div>
    </section>
  )
}

export default HomeMain