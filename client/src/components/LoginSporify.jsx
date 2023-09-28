import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import { useEffect } from 'react'

const LoginSporify = () => {
    const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=35d1441c9453418e9ffde36056b7e18a&response_type=code&redirect_uri=http://localhost:3000/home/*&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

    return (
    <Container className='d-flex justify-content-center align-items-center'
    style={{ minHeight: "100vh" }}>
    <a className='btn btn-success btn-lg' href={AUTH_URL}>
        Login with Spotify
    </a>
    </Container>
  )
}

export default LoginSporify