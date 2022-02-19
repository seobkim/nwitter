import {HashRouter as Router, /*Redirect,*/ Route, Switch} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "./Navigation";

//위에서 Router 란 이름으로 import 를 정의하여서 상수 명칭 중복안되도록 AppRouter로 정의
const AppRouter=({isLoggedIn, userObj})=>{
    return(
        <Router>
            {/*Switch 사용하면 여러가지 Route중 하나만 렌더링 함*/}
            {isLoggedIn && <Navigation/>}
            <Switch>
                {isLoggedIn?(
                <>
                    <Route exact path ="/">
                        <Home userObj = {userObj}/>
                    </Route>
                    <Route exact path = "/profile">
                        <Profile/>
                    </Route>
                </>
                ):(
                    <Route exact path = "/">
                        <Auth />
                    </Route>
                )}
                { /* 리다이렉트 함수 */}
                { /* <Redirect from = "*" to = "/"/> */}
            </Switch>
        </Router>
    )
}

export default AppRouter;