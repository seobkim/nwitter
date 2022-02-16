import { useState } from "react";

const Auth = () => {

    //hooks useState 함수 공부공부공부//
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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

    const onSubmit = (event) =>{
        event.preventDefault();
    };

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input name= "email" type="email" placeholder="Email" required value={email} onChange={onChange}></input>
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange}></input>
                <input type='submit' value="Log In"></input>
            </form>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
        </div>
    )
};

export default Auth;