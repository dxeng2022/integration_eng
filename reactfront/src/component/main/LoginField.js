import React from 'react';
import './LoginFeild.css';
import {Box, Button, Modal, TextField} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

// 모달 스타일
const modalStyle = {
    position: 'absolute',
    top: '43%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '43vh',
    height: '28vh',
    bgcolor: '#F0F0F0',
    borderRadius: 15,
    boxShadow: 12,
    p: 4,
};

const LoginField = () => {
    const {localhost} = useSelector((store) => store);

    const navigate = useNavigate();

    // 모달관련
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        let details = {
            'username': data.get('email'),
            'password': data.get('password'),
        };

        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch(localhost + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            body: formBody,
        })
            .then(res => {
                console.log(1, res)
                const form = res.url.substring(res.url.lastIndexOf(":"));
                const url = form.slice(form.indexOf("/"));
                if (res.status === 200) {
                    navigate(url);
                } else {
                    handleOpen();
                }
            })
    };

    return (
        <div className="loginField">
            <Box component="form" noValidate onSubmit={handleSubmit}>
                <div className="login_inputField">
                    <div>
                        <TextField id="standard-basic" name="email" label="이메일" variant="standard"
                                   sx={{width: '35vh'}}/>
                    </div>
                    <div>
                        <TextField id="standard-basic" name="password" label="비밀번호" type="password" variant="standard"
                                   sx={{width: '35vh'}}/>
                    </div>
                </div>
                <div className="login_linkField">
                    <Link to={"/find-info"} state={{fieldValue: 0}} style={{textDecoration: 'none'}}>
                        <p className="login_findLink">이메일찾기</p>
                    </Link>
                    <p className="login_findNoLink">/</p>
                    <Link to={"/find-info"} state={{fieldValue: 1}} style={{textDecoration: 'none'}}>
                        <p className="login_findLink">비밀번호찾기</p>
                    </Link>
                </div>
                <div className="login_buttonField">
                    <Button type="submit"
                            variant="contained"
                            sx={{
                                width: '35vh',
                                borderRadius: 30,
                                backgroundColor: '#8CD8E9',
                                '&:hover': {
                                    backgroundColor: '#6BA3AF'
                                }
                            }}
                    >
                        로그인
                    </Button>
                    <br/>
                    <Button variant="contained"
                            sx={{
                                width: '35vh',
                                borderRadius: 30,
                                backgroundColor: '#A9D18E',
                                '&:hover': {
                                    backgroundColor: '#7C9A67'
                                }
                            }}
                            onClick={() => navigate("/policy")}
                    >
                        회원가입
                    </Button>
                </div>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="modalField"
            >
                <Box sx={modalStyle} className="login_modal">
                    <div className="login_modal_scriptField">
                        <div className="login_modal_headScript">
                            <h2>올바르지 않은 정보를 입력하였습니다.</h2>
                        </div>
                        <div className="login_modal_script">
                            <p>지속적으로 문제발생 시 Contact Us를 통해 문의바랍니다.</p>
                        </div>
                        <div className="login_modal_buttonField">
                            <Button variant="contained"
                                    sx={{
                                        width: 200,
                                        height: '4vh',
                                        borderRadius: 30,
                                        marginLeft: '2vh',
                                        marginRight: '2vh',
                                        backgroundColor: '#D1D1D1',
                                        '&:hover': {
                                            backgroundColor: '#858585'
                                        }
                                    }}
                                    onClick={() => handleClose()}
                            >
                                확인
                            </Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default LoginField;