import {auth, provider} from "../firebase-config"
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Auth = ({ setIsAuth }) => {
   const signInWithGoogle = async() => {
    try {
      const result = await signInWithPopup(auth, provider)
      console.log(result)
      cookies.set("auth-token", result.user.refreshToken)
      setIsAuth(true)

    } catch (error) {
      console.log(error.message)
    }   
   }

  return (
    <div>
        <p>Sign in with Google to continue</p>
        <button onClick={signInWithGoogle}>Sign In with google</button>
    </div>
  )
}

export default Auth