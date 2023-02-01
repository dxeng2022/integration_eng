import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Box} from "@mui/material";
import {useNavigate} from "react-router-dom";

const UserMyPage = () => {
    const navigate = useNavigate();
    const {localhost} = useSelector((store) => store);
    const [phoneChanged, setPhoneChanged] = useState(false);
    const [user, setUser] = useState({
        id: "",
        username: "",
        name: "",
        phone: ""
    });

    useEffect(() => {
        // 첫번째 then 에 promise 받음(ticket)
        // 두번째 then 에 데이터 넘겨줌
        fetch(localhost + "/user/my-info").then(res => res.json()).then(res => {
            setUser(res);
        }); // 비동기 함수
    }, [phoneChanged]);

    const changePassword = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        let details = {
            id: user.id,
            prePassword: data.get('prePassword'),
            newPassword: data.get('newPassword'),
        };

        console.log(details);

        fetch(localhost + "/api/user/" + details.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(details)
        })
            .then(res => {
                console.log(1, res)
                if (res.status === 200) {
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
                    alert("수정완료");
                } else {
                    alert("수정실패");
                }
            })
    }

    const changePhone = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        let details = {
            id: user.id,
            phone: data.get('phone')
        };

        console.log(details);

        fetch(localhost + "/api/user/" + details.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(details)
        })
            .then(res => {
                console.log(1, res)
                if (res.status === 200) {
                    alert("수정완료");
                    setPhoneChanged(!phoneChanged);
                } else {
                    alert("수정실패");
                }
            })
    }

    const resign = (e) => {
        e.preventDefault();

        let details = {
            id: user.id,
            resign: 'Y'
        };

        console.log(details);

        fetch(localhost + "/api/user/" + details.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(details)
        })
            .then(res => {
                console.log(1, res)
                if (res.status === 200) {
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
                    alert("수정완료");
                } else {
                    alert("수정실패");
                }
            })
    }

    return (
        <div>
            <h1>마이페이지</h1>
            <table>
                <tbody>
                <tr>
                    <td>이름</td>
                    <td>{user.name}</td>
                </tr>
                <tr>
                    <td>전화번호</td>
                    <td>{user.phone}</td>
                </tr>
                </tbody>
            </table>
            <Box component="form" onSubmit={changePassword}>
                <div>현재 비밀번호</div>
                <div><input type="password" name="prePassword"/></div>
                <div>비밀번호 변경</div>
                <div><input type="password" name="newPassword"/></div>
                <button type="submit">변경</button>
            </Box>
            <Box component="form" onSubmit={changePhone}>
                <div>전화번호 변경</div>
                <div><input type="text" name="phone"/></div>
                <button type="submit">변경</button>
            </Box>
            <Box component="form" onSubmit={resign}>
                <button type="submit">회원탈퇴</button>
            </Box>
        </div>
    );
};

export default UserMyPage;
