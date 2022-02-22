import { dbService, storageService } from "fbase";
import { useEffect, useState } from "react";
import Nweet from "components/Nweet";
import { v4 as uuidv4 } from "uuid";

const Home = ({userObj}) =>{

    const[nweet, setNweet] = useState("");
    const[nweets, setNweets] = useState([]);    
    const[attachment, setAttachment] = useState("");
    

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
        
        // 스토리지 레퍼런스의 함수인 child를 사용하여 폴더 ,파일 이름을 설정할 수 있음
        // 아래 코드는 스토리지,레퍼런스를 순서대로 호출한 다음 child 함수에 사영자 아이디를 폴더 이름으로, 파일 이름을 uuidv4로 처리
        // 파일 확장자의 경우 업로드 과정엗서 자동으로 설정됨

        let attachmentUrl = "";
        if(attachment !== ""){

        const attachmentRef = storageService
            .ref()
            .child(`${userObj.uid}/${uuidv4()}`);

        //Firebase Storage에 이미지 저장
        const response = await attachmentRef.putString(attachment,"data_url");
        
        //저장한 이미지를 response에서 download url 을 가져옴
        attachmentUrl = await response.ref.getDownloadURL();
        }
        
        // DB에 글 저장
        await dbService.collection("nweets").add({
            text: nweet,
            createdAt: Date.now(),
            creatorId:userObj.uid,
            attachmentUrl,
        });
        setNweet("");
        setAttachment("");
    };
    
    // 글 작성 칸 변경되었을시 Event
    const onChange = (event) =>{
        event.preventDefault();
        const{
            target : {value},
        }= event ;
        setNweet(value);
    };

    // 파일선택 버튼 클릭 시 Event
    const onFileChange = (event) =>{
        const {
            target : {files},
        }= event;
        const theFile = files[0];
        const reader = new FileReader();
        
        reader.readAsDataURL(theFile);
        
        reader.onload = (finishedEvent) =>{
            const{
                currentTarget : {result},
            }= finishedEvent;
            setAttachment(result);
        }
    }

    //파일 선택 취소 Event
    const onClearAttachment = () => setAttachment("");

    return(
        <>
            <form onSubmit={onSubmit}>
                <input value = {nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}></input>
                <input type ="file" accept="image/*" onChange={onFileChange}></input>
                {attachment &&(
                    <div>
                        <img src={attachment} width="50px" height="50px"></img>
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                )}
                <input type = "submit" value="Nweet"></input>
            </form>
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