import React from 'react';
import './PrivacyPolicyPage.css'
import {Checkbox, Paper, TextareaAutosize} from "@mui/material";
import {useNavigate} from "react-router-dom";
import SignupButtonField from "../component/main/SignupButtonField";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const PrivacyPolicyPage = () => {
    const navigate = useNavigate();
    let policy =
        ' (주) 위세아이텍 개인정보 처리 방침\n' +
        '\n' +
        ' (주)위세아이텍(이하 ‘회사’라 한다)는 개인정보 보호법 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원할하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리지침을 수립, 공개합니다.\n' +
        '\n' +
        ' 제1조(개인정보의 처리목적) 회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.\n' +
        '\n' +
        '  1. 홈페이지 회원 가입 및 관리\n' +
        '  회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별, 인증, 회원자격 유지, 관리, 제한적 본인확인제 시행에 따른 본인확인, 서비스 부정이용 방지, 만 14세 미만 아동의 개인정보 처리시 법정대리인의 동의여부 확인, 각종 고지, 통지, 고충처리 목적으로 개인정보를 처리합니다.\n' +
        '\n' +
        '  2. 재화 또는 서비스 제공\n' +
        '  물품배송, 서비스 제공, 계약서 및 청구서 발송, 콘텐츠 제공, 맞춤서비스 제공, 본인인증, 연령인증, 요금결제 및 정산, 채권추심 등을 목적으로 개인정보를 처리합니다.'
        + '\n';
    return (
        <div className="policyContainer">
            <Paper elevation={8} className="signupPaper" sx={{borderRadius: 0}}>
                <div className="signup_titleField">
                    <div className="arrowBackIcon" onClick={() => navigate(-1)}>
                        <ArrowBackIcon sx={{fontSize: 35, marginTop:2}}/>
                    </div>
                    <label className="signupTitle" onClick={() => navigate("/")}>
                        <h3>엔지니어링 설계정보 디지털 변환 플랫폼</h3>
                    </label>
                </div>

                <div className="signupLabel">
                    <div className="signup_mainLabel">
                        <h2>회원가입</h2>
                    </div>
                    <div className="signup_borderLine"></div>
                    <div className="signup_subLabel">
                        <h2>개인정보 약관</h2>
                    </div>
                </div>

                <div className="signupPolicy">
                    <TextareaAutosize
                        maxRows={100}
                        aria-label="maximum height"
                        placeholder="Maximum 4 rows"
                        defaultValue={policy}
                        style={{ width: '90vh', height: '30vh', overflow:"scroll", overflowX:"hidden", resize: "none"}}
                        readOnly
                    />
                </div>

                <div className="signupCheck">
                    <div>
                        <Checkbox/>
                    </div>
                    <div>
                        <p>개인정보 수집 및 이용에 모두 동의합니다.</p>
                    </div>
                </div>

                <SignupButtonField/>
            </Paper>
        </div>
    );
};

export default PrivacyPolicyPage;