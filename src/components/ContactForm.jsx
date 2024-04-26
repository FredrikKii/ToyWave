import React, { useState, useEffect } from 'react';
import "../stylesheet/ContactForm.css"

const ContactForm = () => {
   

	return (
        <div>
                <div className='form-container'>
                    <h1>Contact us!</h1>
                    <input className='name-input' placeholder="Name"></input>
                    <input className='email-input' placeholder="Email"></input>
                    <textarea name="message-input" id="message-input" placeholder="Type here.."></textarea>
                    <button className='send-button'>Send</button>
                </div>
        </div>
    );
};

export default ContactForm;
