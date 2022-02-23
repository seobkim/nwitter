import { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init , setInit] = useState(false);
  const [userObj,setUserObj] = useState(null);
 
  useEffect(()=>{
    authService.onAuthStateChanged((user) => {
      if (user){
        console.log(user);

        setUserObj({
          uid: user.uid,
          displayName: user.displayName,
          updateProfile: (args) =>user.updateProfile(args),
        });
      }else{
        setUserObj(false);
      }
      setInit(true);
    });
  },[]);

  //로그인된 유저 프로필 변경되었을 시 
  const refreshUser = () =>{
    //setUserObj(authService.currentUser);
    const user = authService.currentUser;
    setUserObj({
      uid: user.uid,
      displayName: user.displayName,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return(
    <>
    {init ? (<AppRouter refreshUser= {refreshUser} isLoggedIn={Boolean(userObj)} userObj = {userObj}/>): "initializing..."}
    </>
  )
}

export default App