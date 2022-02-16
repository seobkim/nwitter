import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

//위에서 Router 란 이름으로 import 를 정의하여서 상수 명칭 중복안되도록 AppRouter로 정의
const AppRouter=({isLoggedIn})=>{
    return(
        <Router>
            {/*Switch 사용하면 여러가지 Route중 하나만 렌더링 함*/}
            <Switch>
                {isLoggedIn?(
                    <Route exact path ="/">
                        <Home />
                    </Route>
                ):(
                    <Route exact path = "/">
                        <Auth />
                    </Route>
                )}
            </Switch>
        </Router>
    )
}

export default AppRouter;