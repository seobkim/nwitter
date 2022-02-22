import { dbService, storageService } from "fbase";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
const Nweet =( {nweetObj, isOwner} ) =>{

    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    // 글 삭제 버튼(Delete Nweet) 클릭 EVent
    const onDeleteClick = async(event) =>{
        const ok = window.confirm("글을 삭제하시겠습니까?");

        if(ok){
            await dbService.doc(`nweets/${nweetObj.id}`).delete();

            if(nweetObj.attachmentUrl !== ""){
                await storageService.refFromURL(nweetObj.attachmentUrl).delete();
            }
        }
    };

    //글 수정 버튼(Edit Nweet) 클릭 Event
    const toogleEditting = () => setEditing((prev) => !prev);

    //글 수정 시(input box 글 변경) Event
    const onChange = (event) =>{
        const{
            target : {value},
        } = event;

        setNewNweet(value);
    }

    //글 수정(update Nweet) 버튼 클릭 Event
    const onSubmit = async (event) =>{
        event.preventDefault();

        await dbService.doc(`nweets/${nweetObj.id}`).update({text:newNweet});
        setEditing(false);
    }

    return (
        <div className="nweet">
            {editing ? (
                <>
                    <form onSubmit={onSubmit} className="container nweetEdit">
                        <input value = {newNweet} onChange={onChange} required placeholder="Edit your nweet" autoFocus className="formInput"/>
                        <input type = "submit" value = "Update Nweet" className="formBtn"/>
                    </form>
                    <button onClick = {toogleEditting} className="formBtn cancelBtn">Cancel</button>
                </>
            ):(
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && (
                        <img src = {nweetObj.attachmentUrl} width= "50px" height= "50px"/>
                    )}
                    {isOwner && (
                        <div className="nweet__actions">
                            {/* jsx에서 onClick 이벤트에 새로운 함수의 파라미터 전달시 방법*/
                            /*
                                옳은 방법 : <button onClick={ (e) => onDeleteClick("dd") }>Delete Nweet</button>
                                틀린 방법 : <button onClick={onDeleteClick("dd") }>Delete Nweet</button>
                            */
                            }
                            <span onClick = {onDeleteClick}>
                                <FontAwesomeIcon icon= {faTrash}></FontAwesomeIcon>
                            </span>
                            <span onClick = {toogleEditting}>
                                <FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon>
                            </span>    
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Nweet