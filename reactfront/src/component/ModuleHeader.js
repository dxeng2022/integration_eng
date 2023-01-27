import React, {useEffect, useState} from 'react';
import './ModuleHeader.css';
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const ModuleHeader = () => {
    const navigate = useNavigate();
    const {localhost} = useSelector((store) => store);
    const [user, setUser] = useState({
        username: "",
        name: "",
    });

    useEffect(() => {
        // 첫번째 then 에 promise 받음(ticket)
        // 두번째 then 에 데이터 넘겨줌
        fetch(localhost + "/user/my-info").then(res => res.json()).then(res => {
            setUser(res);
        }); // 비동기 함수
    }, []);

    const logout = () => {
        fetch(localhost + "/logout", {
            method: "GET",
        })
            .then(res => {
                console.log(1, res)
                const form = res.url.substring(res.url.lastIndexOf(":"));
                const url = form.slice(form.indexOf("/"));
                if (res.status === 200) {
                    navigate(url);
                }
            })
    }

    return (
        <div className="moduleHeader">
            <label className="moduleHeaderLabel" onClick={() => navigate("/module")}>
                <h2>엔지니어링 설계정보 디지털 변환 플랫폼</h2>
            </label>

            <div className="header_loginForm">
                <div className="header_loginImg">
                    <img src="../../img/contact.png"/>
                </div>
                <div>
                    <div className="header_loginName">
                        <h2>{user.name} 님</h2>
                    </div>
                    <div className="header_loginLink">
                        <div>
                            <Link to={"/userinfo"} style={{textDecoration: 'none'}}>
                                <p>마이페이지</p>
                            </Link>
                        </div>
                        <div className="header_loginBorder"></div>
                        <div onClick={logout} style={{cursor:"pointer"}}>
                            <p>로그아웃</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModuleHeader;