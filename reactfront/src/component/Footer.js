import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <div className="foot">
            <div className="foot_contact">
                <img src="../../img/contact.png"/>
                <p>Contact Us</p>
            </div>
            <div className="foot_borderLine"></div>
            <div className="foot_post">
                <div className="foot_postMail">
                    <img src="../../img/mail.png"/>
                    <p>dxeng@wise.co.kr</p>
                </div>
                <div className="foot_postPhone">
                    <img src="../../img/phone.png"/>
                    <p>02-6246-1400</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;