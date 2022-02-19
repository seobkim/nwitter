import { dbService } from "fbase";
import { useState } from "react";
const Home = () =>{

    const[nweet, setNweet] = useState("");
    
    const onSubmit = async (event) =>{
        event.preventDefault();
        await dbService.collection("nweets").add({
            text:nweet,
            createAt:Date.now(),
        });
        setNweet("");
    };

    const onChange = (event) =>{
        event.preventDefault();
        const{
            target : {value},
        }= event ;
        setNweet(value);
    };

    return(
        <form onSubmit={onSubmit}>
            <input value = {nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}></input>
            <input type = "submit" value="Nweet"></input>
        </form>
    )
}

export default Home;