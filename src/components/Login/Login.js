import React from 'react'
import { Button } from '@mui/material';
import ConnectLogo from '../../public/connectLogo.png';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import './Login.css'
import { actionTypes } from '../../StateProvider/reducer';
import { useStateValue } from '../../StateProvider/StateProvider';


function Login() {

    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const [state, dispatch] = useStateValue();

    const signIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                //dispatch the user state
                dispatch({
                    type: actionTypes.SET_USER,
                    //push in user into the data
                    user: result.user
                })
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <div className='login'>
            <div className='login_container'>
                <img
                    src={ConnectLogo}
                    alt=""
                />
                <h1>Sign in to Connect App</h1>
                <p>connectpeople.great-site.net</p>
                <Button onClick={signIn}>Sign In with Google</Button>
            </div>
        </div>
    )
}

export default Login; 
