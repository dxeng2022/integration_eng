import React from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Login";
import FindEmail from "./FindEmail";
import FindPw from "./FindPw";

function Main() {

    const navigate = useNavigate();

    return (
        <>
            <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/findemail" element={<FindEmail />} />
                    <Route path="/findpw" element={<FindPw />} />
            </Routes>

            <div className="main_box">
                <div className="main_title" onClick={()=>{ navigate('/') }}>
                    설계정보 디지털 변환 플랫폼
                </div>
                <div className="main_content">
                    <img src="/img/network.png" alt="img" className="main_img" />
                    <div className="main_line" />
                </div>
            </div>
        </>
    )
}

export default Main;