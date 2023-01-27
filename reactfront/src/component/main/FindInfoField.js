import React, {useState} from 'react';
import './FindInfoField.css';
import {Box, Button, Modal, Tab, Tabs, TextField, Typography} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import InputDateField from "./InputDateField";
import {useSelector} from "react-redux";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

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

const FindInfoField = () => {
    const {localhost} = useSelector((store) => store);

    const navigate = useNavigate();
    const location = useLocation();
    const fieldValue = location.state.fieldValue;
    const [value, setValue] = React.useState(fieldValue);
    const [resUser, setResUser] = useState({
        username: "",
    });

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    // 모달관련
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [resetOpen, setResetOpen] = React.useState(false);
    const handleResetOpen = () => setResetOpen(true);
    const handleResetClose = () => setResetOpen(false);

    const [errOpen, setErrOpen] = React.useState(false);
    const handleErrOpen = () => setErrOpen(true);
    const handleErrClose = () => setErrOpen(false);

    // 이메일, 비밀번호 찾기
    const handleSubmits = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let url;
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
            name: data.get('name'),
            phone: data.get('phone'),
            birth: addBirth
        };

        if (value === 0) {
            url = localhost + "/find-mail";
        } else if (value === 1) {
            url = localhost + "/find-pw";
        }
        console.log(url.slice(url.lastIndexOf("/")))
        if (url.slice(url.lastIndexOf("/")) === "/find-mail") {
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify(user)
            })
                .then(res => {
                    console.log(1, res)
                    if (res.status === 200) {
                        return res.json();
                    } else if (res.status === 400) {
                        return null;
                    }
                })
                .then(res => { // Catch는 여기서 오류가 나야 실행됨
                    console.log("정상", res);
                    if (res !== null) {
                        setResUser(res);
                        handleOpen();
                    } else {
                        handleErrOpen();
                    }
                })
        }

        if (url.slice(url.lastIndexOf("/")) === "/find-pw") {
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify(user)
            })
                .then(res => {
                    console.log(1, res)
                    if (res.status === 200) {
                        handleResetOpen();
                    } else {
                        handleErrOpen();
                    }
                })
        }
    }

    return (
        <div className="findInfoField">
            <Box sx={{width: '99%'}} className="find_infoBox" component="form" noValidate onSubmit={handleSubmits}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                        <Tab sx={{fontSize: '2vh', fontWeight: 1000, margin: '3px 2vh 3px 1vh'}}
                             label="아이디 찾기" {...a11yProps(0)} />
                        <Tab sx={{fontSize: '2vh', fontWeight: 1000}} label="비밀번호 찾기" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0} className="infoPanel">
                    <div className="find_inputField">
                        <TextField id="standard-basic" name="name" label="이름" variant="standard"
                                   sx={{width: '33vh'}}/>
                    </div>
                    <div className="find_inputField">
                        <TextField id="standard-basic" name="phone" label="전화번호" variant="standard"
                                   sx={{width: '33vh'}}/>
                    </div>
                    <div className="find_inputField">
                        <InputDateField/>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1} className="infoPanel">
                    <div className="find_inputField">
                        <TextField id="standard-basic" name="username" label="이메일" variant="standard"
                                   sx={{width: '33vh'}}/>
                    </div>
                    <div className="find_inputField">
                        <TextField id="standard-basic" name="name" label="이름" variant="standard"
                                   sx={{width: '33vh'}}/>
                    </div>
                    <div className="find_inputField">
                        <TextField id="standard-basic" name="phone" label="전화번호" variant="standard"
                                   sx={{width: '33vh'}}/>
                    </div>
                    <div className="find_inputField">
                        <InputDateField/>
                    </div>
                </TabPanel>

                <div className="find_buttonField">
                    <Button variant="contained"
                            sx={{
                                width: 120,
                                height: '5vh',
                                borderRadius: 30,
                                marginLeft: '2vh',
                                marginRight: '2vh',
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
                                height: '5vh',
                                borderRadius: 30,
                                marginLeft: '2vh',
                                marginRight: '2vh',
                                backgroundColor: '#8CD8E9',
                                '&:hover': {
                                    backgroundColor: '#6BA3AF'
                                }
                            }}
                    >
                        다음
                    </Button>
                </div>
            </Box>

            {/*모달관련*/}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="modalField"
            >
                <Box sx={modalStyle} className="find_modal">
                    <div className="modal_scriptField">
                        <div className="modal_headScript">
                            <h2>귀하의 이메일은</h2>
                        </div>
                        <div className="modal_script">
                            <p>{resUser.username}</p>
                        </div>
                        <div className="modal_footScript">
                            <h2>입니다.</h2>
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

            <Modal
                open={resetOpen}
                onClose={handleResetClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="modalField"
            >
                <Box sx={modalStyle} className="find_modal">
                    <div className="modal_scriptField">
                        <div className="modal_headScript">
                            <h2>귀하의 이메일로 임시 비밀번호를 발송했습니다.</h2>
                        </div>
                        <div className="modal_buttonField">
                            <Button variant="contained"
                                    sx={{
                                        width: 120,
                                        height: '4vh',
                                        borderRadius: 30,
                                        marginLeft: '2vh',
                                        marginRight: '2vh',
                                        backgroundColor: '#D1D1D1',
                                        '&:hover': {
                                            backgroundColor: '#858585'
                                        }
                                    }}
                                    onClick={() => handleResetClose()}
                            >
                                닫기
                            </Button>
                            <Button variant="contained"
                                    sx={{
                                        width: 120,
                                        height: '4vh',
                                        borderRadius: 30,
                                        marginLeft: '2vh',
                                        marginRight: '2vh',
                                        backgroundColor: '#8CD8E9',
                                        '&:hover': {
                                            backgroundColor: '#6BA3AF'
                                        }
                                    }}
                                    onClick={() => navigate("/")}
                            >
                                로그인하기
                            </Button>
                        </div>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={errOpen}
                onClose={handleErrClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="modalField"
            >
                <Box sx={modalStyle} className="find_modal">
                    <div className="modal_errScriptField">
                        <div className="modal_errScript">
                            <h2>사용자 정보를 찾을 수 없습니다.</h2>
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
                                    onClick={() => handleErrClose()}
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

export default FindInfoField;
