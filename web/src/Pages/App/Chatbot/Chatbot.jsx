import React, { useState } from "react";
import Patientnav from "../Components/patientnav";

const Chatbot = () => {
    const [inputText, setInputText] = useState("");

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleButtonClick = () => {
        console.log("Input Text:", inputText);
    };

    return (
        <>
            <Patientnav activeName="Chatbot" />
            <div className="container">
                <p className="mytitle mt-3" style={{ color: "var(--Carify-black)" }}>Chatbot :</p>
                <div className="chatbotdiv">
                    <div className="chat">
                        <div className="patientchatdiv">
                            <div className="patientchat">
                                hkbh
                            </div>
                        </div>
                    </div>
                    <div className="search-container">
                        <div className="searchbar">
                            <input
                                type="text"
                                value={inputText}
                                onChange={handleInputChange}
                                placeholder="Type your message..."
                                style={{
                                    width: "100%",
                                    border: "none",
                                    outline: "none",
                                    padding: "5px",
                                    fontSize: "1rem",
                                }}
                            />
                        </div>
                        <button className="searchbutton" onClick={handleButtonClick}>
                            Go
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chatbot;
