import { useState } from "react";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes} from "@fortawesome/free-solid-svg-icons"

const NweetFactory= ({userObj}) =>{

    const[nweet, setNweet] = useState("");
    const[attachment, setAttachment] = useState("");

    // Nweet(글 작성) 버튼 클릭 시 Event
    const onSubmit = async (event) =>{
        event.preventDefault();

        if(nweet === ""){
            return;
        }
        
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

        const nweetObj = {
            text: nweet,
            createAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        };

        // DB에 글 저장
        await dbService.collection("nweets").add(nweetObj);
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
        
        
        reader.onloadend = (finishedEvent) =>{
            const{
                currentTarget : {result},
            }= finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };

    //파일 선택 취소 Event
    const onClearAttachment = () => setAttachment("");

    return(
        <form onSubmit={onSubmit} className= "factoryForm">
            <div className= "factoryInput__container">
                <input className = "factoryInput__input" value = {nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}></input>
                <input className = "factoryInput__arrow" type = "submit" value="&rarr;"></input>
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add photo</span>
                <FontAwesomeIcon icon= {faPlus}></FontAwesomeIcon>
            </label>
            <input type ="file" accept="image/*" onChange={onFileChange}  style={{opacity:0,}}></input>
            {attachment &&(
                <div className="factoryForm__attachment">
                    <img src={attachment} style={{backgroundImage: attachment,}}></img>
                    <div className= "factoryForm__clear" onClick={onClearAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon= {faTimes}/>
                    </div>
                </div>
            )}
        </form>
    );
};
export default NweetFactory;