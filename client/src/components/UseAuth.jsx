import axios from 'axios'
import React from 'react'
import { useEffect ,useState } from 'react'
const UseAuth = (props) => {
    
    const [code ,setCode ] = useState(props.code)
    console.log(code,'123123')
    useEffect(() => {
        axios.post('http://localhost:5000/api/login',{code})
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    },[])
  return (
    <div>UseAuth</div>
  )
}

export default UseAuth