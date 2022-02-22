import { authService, firebaseInstance } from "fbase";
import AuthForm from "components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import{ faTwitter, faGoogle, faGithub,} from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
    //소셜 로그인 이벤트
    const onSocialClick = async (event) => {
        console.log(event.target.name);
        const {
            target : {name},
        } = event ;
        let provider;
        if(name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }else if(name === "github"){
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    }

    return(
        <div className="authContainer">
            <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="3x" style={{marginBottom: 30}}/>
            <AuthForm/>
            <div className= "authBtns">
                <button onClick = {onSocialClick} name= "google" className= "authBtn">Continue with Google 
                    <FontAwesomeIcon icon={faGoogle} style={{marginLeft: 5}}/>
                </button>
                <button onClick = {onSocialClick} name= "github" className= "authBtn">Continue with Github
                <FontAwesomeIcon icon={faGithub} style={{marginLeft: 5}}/>
                </button>
            </div>
        </div>
    )
};

export default Auth;