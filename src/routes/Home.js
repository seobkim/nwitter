import { dbService } from "fbase";
import { useEffect, useState } from "react";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";


const Home = ({userObj}) =>{

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
        dbService.collection("nweets")
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) =>{
            const newArray = snapshot.docs.map((document) => ({
                id : document.id,
                ...document.data(),
            }));
            setNweets(newArray);
        });
        // 실시간 처리를 위한 예제 함수 호출
        // getNweets();
    },[]);

    return(
        <div className="container">
           <NweetFactory userObj = {userObj}/>
            <div style={{marginTop: 30}}>
                {nweets.map((nweet) => (
                    <Nweet 
                        key={nweet.id} 
                        nweetObj ={nweet}
                        isOwner ={nweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    )
}

export default Home;