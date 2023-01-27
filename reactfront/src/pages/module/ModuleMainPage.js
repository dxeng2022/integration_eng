import React from 'react';
import './ModuleMainPage.css';
import {Button, Paper} from "@mui/material";
import {useNavigate} from "react-router-dom";

const ModuleMainPage = () => {
    const navigate = useNavigate();
    return (
        <div className="moduleContainer">
            <div className="module_paperContainer">
                <Paper elevation={8} className="modulePaper" sx={{borderRadius: 12}}>
                    <img src="/img/draw.png"/>
                    <div className="moduleTitle">
                        <h3>도 면</h3>
                    </div>
                    <div className="module_borderLine"></div>
                    <div className="module_scriptField">
                        <div className="module_scriptLabel">
                            <div className="moduleScriptPoint"></div>
                            <div className="moduleScript">
                                도면 내 객체를 인식하고 구조화 된<br/>
                                디지털 도면으로 변환하는 기술입니다.
                            </div>
                        </div>
                        <div className="module_scriptLabel">
                            <div className="moduleScriptPoint"></div>
                            <div className="moduleScript">
                                데이터를 업로드 및 관리합니다.
                            </div>
                        </div>
                        <div className="module_scriptLabel">
                            <div className="moduleScriptPoint"></div>
                            <div className="moduleScript">
                                도면 모듈을 다운로드합니다.
                            </div>
                        </div>
                    </div>
                    <div className="module_buttonField">
                        <Button variant="contained"
                                sx={{
                                    width: '32vh',
                                    height: 45,
                                    borderRadius: 30,
                                    fontSize: '2vh',
                                    fontWeight: 1000,
                                    backgroundColor: '#12A3CC',
                                    '&:hover': {
                                        backgroundColor: '#0E7997'
                                    }
                                }}
                                onClick={() => navigate("/module/dwg")}
                        >
                            이동하기&nbsp;&nbsp;>
                        </Button>
                    </div>
                </Paper>
                <Paper elevation={8} className="modulePaper" sx={{borderRadius: 12}}>
                    <img src="/img/sheet.png"/>
                    <div className="moduleTitle">
                        <h3>시 트</h3>
                    </div>
                    <div className="module_borderLine"></div>
                    <div className="module_scriptField">
                        <div className="module_scriptLabel">
                            <div className="moduleScriptPoint"></div>
                            <div className="moduleScript">
                                시트 내 객체를 인식하고 구조화 된<br/>
                                디지털 도면으로 변환하는 기술입니다.
                            </div>
                        </div>
                        <div className="module_scriptLabel">
                            <div className="moduleScriptPoint"></div>
                            <div className="moduleScript">
                                데이터를 업로드 및 관리합니다.
                            </div>
                        </div>
                        <div className="module_scriptLabel">
                            <div className="moduleScriptPoint"></div>
                            <div className="moduleScript">
                                시트 모듈을 다운로드합니다.
                            </div>
                        </div>
                    </div>
                    <div className="module_buttonField">
                        <Button variant="contained"
                                sx={{
                                    width: '32vh',
                                    height: 45,
                                    borderRadius: 30,
                                    fontSize: '2vh',
                                    fontWeight: 1000,
                                    backgroundColor: '#5C70EB',
                                    '&:hover': {
                                        backgroundColor: '#4150A9'
                                    }
                                }}
                                onClick={() => navigate("/module/sheet")}
                        >
                            이동하기&nbsp;&nbsp;>
                        </Button>
                    </div>
                </Paper>
                <Paper elevation={8} className="modulePaper" sx={{borderRadius: 12}}>
                    <img src="/img/doc.png"/>
                    <div className="moduleTitle">
                        <h3>문 서</h3>
                    </div>
                    <div className="module_borderLine"></div>
                    <div className="module_scriptField">
                        <div className="module_scriptLabel">
                            <div className="moduleScriptPoint"></div>
                            <div className="moduleScript">
                                문서 내 객체를 인식하고 구조화 된<br/>
                                디지털 도면으로 변환하는 기술입니다.
                            </div>
                        </div>
                        <div className="module_scriptLabel">
                            <div className="moduleScriptPoint"></div>
                            <div className="moduleScript">
                                데이터를 업로드 및 관리합니다.
                            </div>
                        </div>
                        <div className="module_scriptLabel">
                            <div className="moduleScriptPoint"></div>
                            <div className="moduleScript">
                                문서 모듈을 다운로드합니다.
                            </div>
                        </div>
                    </div>
                    <div className="module_buttonField">
                        <Button variant="contained"
                                sx={{
                                    width: '32vh',
                                    height: 45,
                                    borderRadius: 30,
                                    fontSize: '2vh',
                                    fontWeight: 1000,
                                    backgroundColor: '#A74BFD',
                                    '&:hover': {
                                        backgroundColor: '#7030AC'
                                    }
                                }}
                                onClick={() => navigate("/module/doc")}
                        >
                            이동하기&nbsp;&nbsp;>
                        </Button>
                    </div>
                </Paper>
            </div>
        </div>
    );
};

export default ModuleMainPage;
