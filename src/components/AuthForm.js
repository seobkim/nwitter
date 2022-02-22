import { authService } from "fbase";
import { useState } from "react";

const AuthForm = () =>{
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) =>{
        const{
            target: {name,value},
        }= event;
        if(name === "email"){
            setEmail(value);
        }
        else if( name === "password"){
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

     return(
        <>
            <form onSubmit={onSubmit}>
                <input name= "email" type="email" placeholder="Email" required value={email} onChange={onChange}></input>
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange}></input>
                <input type='submit' value={newAccount ? "Create Account" : "Log in"}></input>
                {error}
            </form>
            <span onClick = {toggleAccount}>
                {newAccount ? "Sign in" : "Create Account"}
            </span>
        </>
    );
};

export default AuthForm;