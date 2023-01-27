import React, {useState} from 'react';
import './SignupPage.css';
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Modal,
    Paper,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InputDateField from "../component/main/InputDateField";
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

const SignupPage = () => {
    const {localhost} = useSelector((store) => store);

    const navigate = useNavigate();
    const [userMail, setUserMail] = useState("");
    const [userAuth, setUserAuth] = useState("");
    const [msg, setMsg] = useState("");

    // 모달관련
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOnChangeMail = (e) => {
        setUserMail(e.target.value);
    };

    const handleOnChangeAuth = (e) => {
        setUserAuth(e.target.value);
    }

    // 이메일 중복확인
    const checkDuplicated = () => {
        const post = {
            username: userMail,
        }
        fetch(localhost + "/check-dupl", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(post)
        })
            .then(res => {
                console.log(1, res)
                if (res.status === 200) {
                    setMsg("이미 사용중인 Email 입니다.")
                    handleOpen();
                } else if(res.status === 400) {
                    setMsg("사용가능한 Email 입니다.")
                    handleOpen();
                }
            })
    }

    // 인증번호 메일 발송요청
    const authMailSend = () => {
        console.log(userMail);
        const post = {
            username: userMail,
        }
        fetch(localhost + "/signup-auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(post)
        })
            .then(res => {
                console.log(1, res)
                if (res.status === 200) {
                    setMsg("인증번호를 확인해주세요.");
                    handleOpen();
                } else {
                    setMsg("메일전송 실패");
                    handleOpen();
                }
            })
    }

    // 인증번호 확인
    const authMailCheck = () => {
        const post = {
            authCode: userAuth,
        }
        fetch(localhost + "/signup-authcheck", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(post)
        })
            .then(res => {
                console.log(1, res)
                if (res.status === 200) {
                    setMsg("인증 완료");
                    handleOpen();
                } else {
                    setMsg("인증 실패");
                    handleOpen();
                }
            })
    }

    // 회원가입
    const userSingUp = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let birthMonth;
        let birthDay;

        if (data.get('birthMonth') < 10) {
            birthMonth = '0' + data.get('birthMonth')
        } else {
            birthMonth = String(data.get('birthMonth'));
        }
        if (data.get('birthDay') < 10) {
            birthDay = '0' + data.get('birthDay')
        } else {
            birthDay = String(data.get('birthDay'));
        }

        const addBirth = data.get('birthYear') + birthMonth + birthDay;
        const user = {
            username: data.get('username'),
            password: data.get('password'),
            name: data.get('name'),
            birth: addBirth,
            gender: data.get('gender'),
            phone: data.get('phone'),
            organization: data.get('organization'),
            job: data.get('job')
        };
        fetch(localhost + "/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(user)
        })
            .then(res => {
                console.log(1, res)
                if (res.status === 201) {
                    navigate("/signup-complete");
                } else {
                    alert("회원가입에 실패하였습니다.");
                }
            })
    };

    return (
        <div className="signupContainer">
            <Paper elevation={8} className="signupPaper" sx={{borderRadius: 0}}>
                <div className="signup_titleField">
                    <div className="arrowBackIcon" onClick={() => navigate(-1)}>
                        <ArrowBackIcon sx={{fontSize: 35, marginTop: 2}}/>
                    </div>
                    <label className="signupTitle" onClick={() => navigate("/")}>
                        <h3>엔지니어링 설계정보 디지털 변환 플랫폼</h3>
                    </label>
                </div>

                <div className="signupLabel">
                    <div className="signup_mainLabel">
                        <h2>회원가입</h2>
                    </div>
                </div>

                <div className="signupField">
                    <Box component="form" noValidate onSubmit={userSingUp}>
                        <div className="sign_mailInputField">
                            <TextField id="standard-basic"
                                       name="username"
                                       label="이메일(*)"
                                       variant="standard"
                                       sx={{
                                           width: 235,
                                           marginLeft: 2,
                                       }}
                                       onChange={handleOnChangeMail}
                            />
                            <Button variant="contained"
                                    sx={{
                                        width: 90,
                                        borderRadius: 3,
                                        marginLeft: 1,
                                        backgroundColor: '#12A3CC',
                                        '&:hover': {
                                            backgroundColor: '#0E7997'
                                        }
                                    }}
                                    onClick={() => checkDuplicated()}
                            >
                                중복확인
                            </Button>
                        </div>
                        <div className="sign_mailAuthField">
                            <p className="sign_mailAuthLink"
                                onClick={() => authMailSend()}
                            >
                                이메일 인증하기
                            </p>
                        </div>
                        <div className="sign_mailAuthField">
                            <TextField id="standard-basic"
                                       label="인증번호입력"
                                       variant="standard"
                                       sx={{
                                           width: 235,
                                           marginLeft: 2,
                                       }}
                                       onChange={handleOnChangeAuth}
                            />
                            <Button variant="contained"
                                    sx={{
                                        width: 90,
                                        borderRadius: 3,
                                        marginLeft: 1,
                                        backgroundColor: '#5C70EB',
                                        '&:hover': {
                                            backgroundColor: '#4150A9'
                                        }
                                    }}
                                    onClick={() => authMailCheck()}
                            >
                                확인
                            </Button>
                        </div>
                        <div>
                            <TextField
                                id="standard-password-input"
                                name="password"
                                label="비밀번호(*)"
                                type="password"
                                autoComplete="current-password"
                                variant="standard"
                                sx={{width: 320}}
                            />
                        </div>
                        <div>
                            <TextField
                                id="standard-password-input"
                                label="비밀번호확인"
                                type="password"
                                autoComplete="current-password"
                                variant="standard"
                                sx={{width: 320}}
                            />
                        </div>
                        <div>
                            <TextField id="standard-basic"
                                       name="name"
                                       label="이름(*)"
                                       variant="standard"
                                       sx={{width: 320}}
                            />
                        </div>
                        <div>
                            <InputDateField/>
                        </div>
                        <div>
                            <FormControl id="signup_inputGender">
                                <FormLabel id="demo-row-radio-buttons-group-label">성별</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="gender"
                                >
                                    <FormControlLabel id="signup_genderRadio" value="M" control={<Radio/>}
                                                      label="남자"/>
                                    <FormControlLabel id="signup_genderRadio" value="F" control={<Radio/>}
                                                      label="여자"/>
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div>
                            <TextField id="standard-basic"
                                       name="phone"
                                       label="전화번호(*)"
                                       variant="standard"
                                       sx={{width: 320}}
                            />
                        </div>
                        <div>
                            <TextField id="standard-basic"
                                       label="전화번호2(선택)"
                                       variant="standard"
                                       sx={{width: 320}}
                            />
                        </div>
                        <div>
                            <TextField id="standard-basic"
                                       name="organization"
                                       label="회사명"
                                       variant="standard"
                                       sx={{width: 320}}
                            />
                        </div>
                        <div>
                            <TextField id="standard-basic"
                                       label="부서"
                                       variant="standard"
                                       sx={{width: 320}}
                            />
                        </div>
                        <div>
                            <TextField id="standard-basic"
                                       name="job"
                                       label="직급"
                                       variant="standard"
                                       sx={{width: 320}}
                            />
                        </div>
                        <div className="sign_buttonField">
                            <Button variant="contained"
                                    sx={{
                                        width: 120,
                                        borderRadius: 30,
                                        marginLeft: 4,
                                        marginRight: 4,
                                        backgroundColor: '#D1D1D1',
                                        '&:hover': {
                                            backgroundColor: '#858585'
                                        }
                                    }}
                                    onClick={() => navigate("/")}
                            >
                                취소
                            </Button>
                            <Button variant="contained"
                                    type="submit"
                                    sx={{
                                        width: 120,
                                        borderRadius: 30,
                                        marginLeft: 4,
                                        marginRight: 4,
                                        backgroundColor: '#A9D18E',
                                        '&:hover': {
                                            backgroundColor: '#7C9A67'
                                        }
                                    }}
                            >
                                다음
                            </Button>
                        </div>
                    </Box>
                </div>
            </Paper>

            {/*모달관련*/}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="modalField"
            >
                <Box sx={modalStyle} className="sign_modal">
                    <div className="modal_scriptField">
                        <div className="modal_headScript">
                            <h2>{msg}</h2>
                        </div>
                        <div className="modal_buttonField">
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
                                닫기
                            </Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default SignupPage;