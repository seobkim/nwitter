import { authService, firebaseInstance } from "fbase";
import { useState } from "react";

const Auth = () => {

    //hooks useState 함수 공부공부공부//
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] =useState("");
    const onChange = (event) =>{
        const{
            target: {name, value},
        }= event;
        if(name ==="email"){
            setEmail(value);
        }else if(name ==="password"){
            setPassword(value);
        }
    };

    const onSubmit = async (event) =>{
        try{
            event.preventDefault();
            let data;

            if(newAccount){
                //create new account
                data = await authService.createUserWithEmailAndPassword(email,password);
            }else{
                //log in
                data = await authService.signInWithEmailAndPassword(email,password);
            }
            console.log(data);
        }catch(error){
            setError(error.message);
        }
    };

    //토글 이벤트
    const toggleAccount = () => setNewAccount((prev) => !prev);

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
        <div>
            <form onSubmit={onSubmit}>
                <input name= "email" type="email" placeholder="Email" required value={email} onChange={onChange}></input>
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange}></input>
                <input type='submit' value={newAccount ? "Create Account" : "Log in"}></input>
                {error}
            </form>
            <span onClick = {toggleAccount}>
                {newAccount ? "Sign in" : "Create Account"}
            </span>
            <div>
                <button onClick = {onSocialClick} name="google">Continue with Google</button>
                <button onClick = {onSocialClick} name="github">Continue with Github</button>
            </div>
        </div>
    )
};

export default Auth;