import { authService } from "fbase";
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
    console.log(email+" : "+password);

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

    const toggleAccount = () => setNewAccount((prev) => !prev);

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
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
        </div>
    )
};

export default Auth;