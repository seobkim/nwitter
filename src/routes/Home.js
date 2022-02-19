import { dbService } from "fbase";
import { useEffect, useState } from "react";
import Nweet from "components/Nweet";
const Home = ({userObj}) =>{

    const[nweet, setNweet] = useState("");
    const[nweets, setNweets] = useState([]);    

    //실시간 처리를 위한 예제
    /* 
    const getNweets = async () =>{
        const dbNweets = await dbService.collection("nweets").get();
        console.log(dbNweets);

        dbNweets.forEach((document) => {
        const newObject = {...document.data(), id : document.id};
            setNweets((prev) => [newObject, ...prev])
        }
        );
    }
    */

    useEffect(() => {
        dbService.collection("nweets").onSnapshot((snapshot) =>{
            const newArray = snapshot.docs.map((document) => ({
                id : document.id,
                ...document.data(),
            }));
            setNweets(newArray);
        });
        // 실시간 처리를 위한 예제 함수 호출
        // getNweets();
    },[]);

    // Nweet(글 작성) 버튼 클릭 시 Event
    const onSubmit = async (event) =>{
        event.preventDefault();
        await dbService.collection("nweets").add({
            text : nweet,
            createAt : Date.now(),
            creatorId : userObj.uid,
        });
        setNweet("");
    };
    
    // 글 작성 칸 변경되었을시 Event
    const onChange = (event) =>{
        event.preventDefault();
        const{
            target : {value},
        }= event ;
        setNweet(value);
    };

    return(
        <>
            <form onSubmit={onSubmit}>
                <input value = {nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}></input>
                <input type = "submit" value="Nweet"></input>
            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj ={nweet}></Nweet>
                ))}
            </div>
        </>
    )
}

export default Home;