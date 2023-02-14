import './App.css';
import {Route, Routes, useLocation} from "react-router-dom";
import MainPage from "./pages/MainPage";
import ModuleMainPage from "./pages/module/ModuleMainPage";
import Footer from "./component/Footer";
import ModuleHeader from "./component/ModuleHeader";
import UserMyPage from "./pages/UserMyPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import SignupPage from "./pages/SignupPage";
import SignupCompletePage from "./pages/SignupCompletePage";

function App() {
    const loc = useLocation();
    const firstUrl = loc.pathname.split('/')
    return (
        <div className="App">
            {firstUrl[1] === 'module'?<ModuleHeader/>:''}
            <div className="container">
                <Routes>
                    <Route path="*" exact={true} element={<MainPage/>}/>
                    <Route path="/policy" exact={true} element={<PrivacyPolicyPage/>}/>
                    <Route path="/signup" exact={true} element={<SignupPage/>}/>
                    <Route path="/signup-complete" exact={true} element={<SignupCompletePage/>}/>
                    <Route path="/module" exact={true} element={<ModuleMainPage/>}/>
                    <Route path="/userinfo" exact={true} element={<UserMyPage/>}/>
                </Routes>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
