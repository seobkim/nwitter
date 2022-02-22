import { authService, dbService } from "fbase";
import { useEffect,useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({userObj, refreshUser}) =>{
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    }

    const onChange = (event) =>{
        console.log(event);
        const{
            target: {value},
        } = event;
        setNewDisplayName(value);
    };
    /* firebase db 통해서 조건 쿼리 로드
    const getMyNweets = async () =>{
        const nweets = await dbService
            .collection("nweets")
            .where("creatorId", "==", userObj.uid)  
            .orderBy("createdAt","asc")
            .get();

        console.log(nweets.docs.map((doc)=> doc.data()));
    };

    
    //profile 컴포넌트가 렌더링된 이후 실행될 함수!
    useEffect(() => {getMyNweets();},[]);

    */

    const onSubmit = async (event) =>{
        event.preventDefault();
        if (userObj.displayName !== newDisplayName){
            await userObj.updateProfile({ displayName: newDisplayName});
            refreshUser();
        }
    } ;


    return(
        <>
            <form onSubmit={onSubmit}>
                <input type= "text" onChange= {onChange} value= {newDisplayName} placeholder="displayName"></input>
                <input type= "submit" value="Update Profile"></input>
            </form>
            <button onClick ={onLogOutClick}>Log out</button>
        </>
    );
};

export default Profile;
