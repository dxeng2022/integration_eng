import React from 'react';
import './MainPage.css';
import {Paper} from "@mui/material";
import {Route, Routes, useNavigate} from "react-router-dom";
import LoginField from "../component/main/LoginField";
import FindInfoField from "../component/main/FindInfoField";

const MainPage = () => {
    const navigate = useNavigate();

    return (
        <div className="mainContainer">
            <Paper elevation={8} className="mainPaper" sx={{borderRadius: 12}}>
                <div className="mainTitle">
                    <label style={{cursor:"pointer"}} onClick={() => navigate("/")}>
                        <h2>엔지니어링 설계정보 디지털 변환 플랫폼</h2>
                    </label>
                </div>
                <div className="mainField">
                    <div className="imgField">
                        <img className="mainImg" src="img/network.png"/>
                    </div>

                    <div className="borderLine"></div>

                    <Routes>
                        <Route path="/" exact={true} element={<LoginField/>}/>
                        <Route path="/find-info" exact={true} element={<FindInfoField/>}/>
                    </Routes>
                </div>
            </Paper>
        </div>
    );
};

export default MainPage;

