import { dbService } from "fbase";
import { useState } from "react";

const Nweet =( {nweetObj, isOwner} ) =>{

    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    // 글 삭제 버튼(Delete Nweet) 클릭 EVent
    const onDeleteClick = async(dd) =>{
        console.log(dd);
        const ok = window.confirm("글을 삭제하시겠습니까?");
        console.log(ok);

        if(ok){
            console.log(nweetObj.id);

            const data = await dbService.doc(`nweets/${nweetObj.id}`).delete();
            console.log(data);
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
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input value = {newNweet} onChange={onChange} required></input>
                        <input type = "submit" value = "Update Nweet"></input>
                    </form>
                    <button onClick = {toogleEditting}>Cancel</button>
                </>
            ):(
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && (
                        <img src = {nweetObj.attachmentUrl} width= "50px" height= "50px"/>
                    )}
                    {isOwner && (
                        <>
                            {/* jsx에서 onClick 이벤트에 새로운 함수의 파라미터 전달시 방법*/
                            /*
                                옳은 방법 : <button onClick={ (e) => onDeleteClick("dd") }>Delete Nweet</button>
                                틀린 방법 : <button onClick={onDeleteClick("dd") }>Delete Nweet</button>
                            */
                            }
                            <button onClick = {onDeleteClick}>Delete Nweet</button>
                            <button onClick = {toogleEditting}>Edit Nweet</button>    
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Nweet