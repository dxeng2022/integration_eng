import React from 'react';
import './SignupButtonField.css'
import {Button} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";

const SignupButtonField = () => {
    const navigate = useNavigate();
    const url = useLocation();
    return (
        <div className="signup_buttonField">
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
                    onClick={() => {
                        if (url.pathname == '/policy') {
                            navigate("/signup");
                        } else if (url.pathname == '/signup') {
                            navigate("/signup-complete");
                        }
                    }}
            >
                다음
            </Button>
        </div>
    );
};

export default SignupButtonField;