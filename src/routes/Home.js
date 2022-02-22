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

    return(
        <>
           <NweetFactory userObj = {userObj}/>
            <div>
                {nweets.map((nweet) => (
                    <Nweet 
                        key={nweet.id} 
                        nweetObj ={nweet}
                        isOwner ={nweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </>
    )
}

export default Home;