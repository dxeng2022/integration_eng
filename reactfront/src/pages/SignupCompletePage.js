import React from 'react';
import './SignupCompletePage.css';
import {Button, Paper} from "@mui/material";
import {useNavigate} from "react-router-dom";

const SignupCompletePage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Paper elevation={8} className="mainPaper" sx={{borderRadius: 12}}>
                <div className="mainTitle">
                    <label style={{cursor:"pointer"}} onClick={() => navigate("/")}>
                        <h2>엔지니어링 설계정보 디지털 변환 플랫폼</h2>
                    </label>
                </div>
    
                <div className="signup_completeField">
                    <div className="signup_completeImg">
                        <img src="/img/firework.png"/>
                    </div>
                    <div className="signup_completeLabel">
                        <h1>가입을 축하드립니다!</h1>
                        <h3>최종 승인을 위해 이메일을 반드시 확인 바랍니다.</h3>
                    </div>
                    <div className="signup_completeButtonField">
                        <Button variant="contained"
                                sx={{
                                    width: 160,
                                    borderRadius: 30,
                                    marginLeft: 4,
                                    marginRight: 4,
                                    backgroundColor: '#A9D18E',
                                    '&:hover': {
                                        backgroundColor: '#7C9A67'
                                    }
                                }}
                                onClick={() => navigate("/")}
                        >
                            확인
                        </Button>
                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default SignupCompletePage;