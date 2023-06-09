import React, { useState, useRef, useEffect } from "react";
import "./ChatScreen.css";
import DigiverzLogo from "./Digiverz-logo.png";
import DigiverzMenu from "./menu.gif";
import ExternalLink from "./external-link.svg";
import UserIcon from "./user.png";
import ChatBotIcon from "./chatbot.png";
import SendIcon from "@mui/icons-material/Send";
import LaunchIcon from "@mui/icons-material/Launch";
import { IoMdSend } from "react-icons/io";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { BiBot, BiUser } from "react-icons/bi";

const Home = () => {
  const [chat, setChat] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const [chatIDCounter, setChatIDCounter] = useState(1);
  const [viewMoreState, setViewMoreState] = useState({
    id: 0,
    count: 10,
  });
  const chatScreenContent = useRef();

  useEffect(() => {
    console.log(chatScreenContent.current);
    chatScreenContent.current.scrollTop =
      chatScreenContent.current.scrollHeight;
  }, [chat]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (inputMessage == "") return;

    const name = "shreyas";
    const request_temp = {
      sender: "user",
      sender_id: name,
      msg: inputMessage,
      chat_id: chatIDCounter,
      actions: [],
      links: [],
      details: {},
    };

    setChat((chat) => [...chat, request_temp]);
    setChatIDCounter(chatIDCounter + 1);
    setBotTyping(true);
    setInputMessage("");
    rasaAPI(name, inputMessage);
  };
  const handleButtonRequest = (actionValue) => {
    setUserTyping(false);

    const name = "shreyas";
    const request_temp = {
      sender: "user",
      sender_id: name,
      chat_id: chatIDCounter,
      msg: actionValue,
      actions: [],
      links: [],
      details: {},
    };

    setChat((chat) => [...chat, request_temp]);
    setChatIDCounter(chatIDCounter + 1);
    setBotTyping(true);
    rasaAPI(name, actionValue);
  };

  const rasaAPI = async function handleClick(name, msg) {
    await fetch("http://localhost:5005/webhooks/rest/webhook", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        charset: "UTF-8",
      },
      credentials: "same-origin",
      body: JSON.stringify({ sender: name, message: msg }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          const temp = response[0];
          const recipient_id = temp["recipient_id"];
          let recipient_msg;
          let response_temp;
          try {
            recipient_msg = JSON.parse(temp["text"]);
            response_temp = {
              sender: "bot",
              recipient_id: recipient_id,
              msg: recipient_msg["msg"],
              actions: recipient_msg["pr"] ? recipient_msg["pr"] : [],
              links: recipient_msg["links"] ? recipient_msg["links"] : [],
              details: recipient_msg["details"] ? recipient_msg["details"] : {},
            };
          } catch {
            recipient_msg = temp["text"];
            response_temp = {
              sender: "bot",
              recipient_id: recipient_id,
              msg: recipient_msg,
              chat_id: chatIDCounter,
              actions: [],
              links: [],
              details: {},
            };
          }
          setBotTyping(false);
          setUserTyping(false);
          console.log(chat);
          setChat((chat) => [...chat, response_temp]);
          setChatIDCounter(chatIDCounter + 1);
          // scrollBottom();
        }
      });
  };

  return (
    <div className="chatscreen-container">
      <div className="chatscreen-header">
        <div className="chatscreen-header-logo">
          <img src={DigiverzLogo} alt="Logo" />
        </div>
        <div className="chatscreen-header-menu">
          <img src={DigiverzMenu} alt="Logo" />
        </div>
      </div>
      <div className="chatscreen-content" ref={chatScreenContent}>
        {chat.map((chatContent, index) => {
          return (
            <div
              key={index}
              style={{
                justifyContent:
                  chatContent.sender == "bot" ? "flex-start" : "flex-end",
              }}
              className="chartscreen-content-text"
            >
              {chatContent.sender == "bot" ? (
                <span className="chatscreen-content-icon">
                  <img src={ChatBotIcon} />
                </span>
              ) : (
                <></>
              )}
              {/* Chat Contents */}
              <div
                className="chatscreen-content-chat"
                style={{
                  alignItems:
                    chatContent.sender == "bot" ? "flex-start" : "flex-end",
                }}
              >
                {chatContent.msg ? (
                  <span
                    className="chatscreen-content-msg"
                    style={{
                      borderTopLeftRadius:
                        chatContent.sender == "bot" ? "0px" : "",
                      borderTopRightRadius:
                        chatContent.sender == "user" ? "0px" : "",
                    }}
                  >
                    {chatContent.msg}
                  </span>
                ) : (
                  <></>
                )}

                {chatContent.links ? (
                  <div className="chatscreen-content-links">
                    {chatContent.links.map((link, linkIndex) => (
                      <a href={link.link} target="_blank">
                        {link.tag}
                        <img src={ExternalLink} />
                      </a>
                    ))}
                  </div>
                ) : (
                  <></>
                )}

                {chatContent.actions ? (
                  <div
                    className="chatscreen-content-actions"
                    style={{
                      justifyContent:
                        chatContent.sender == "bot" ? "flex-start" : "flex-end",
                    }}
                  >
                    {chatContent.actions
                      .slice(
                        0,
                        chatContent.chat_id == viewMoreState.id
                          ? viewMoreState.count
                          : 10
                      )
                      .map((action, actionIndex) => (
                        <Button
                          variant="outlined"
                          key={actionIndex}
                          size="small"
                          style={{
                            margin: "5px 10px 5px 0px",
                            textTransform: "capitalize",
                            letterSpacing: "0.4px",
                            fontSize: "10px",
                            fontWeight: "550",
                          }}
                          onClick={(e) => {
                            handleButtonRequest(action);
                          }}
                        >
                          {action}
                        </Button>
                      ))}
                    {chatContent.actions.length > 0 ? (
                      <Button
                        variant="outlined"
                        size="small"
                        style={{
                          margin: "5px 10px 5px 0px",
                          textTransform: "capitalize",
                          letterSpacing: "0.4px",
                          fontSize: "10px",
                          fontWeight: "550",
                        }}
                        onClick={(e) => {
                          chatContent.chat_id == viewMoreState.id
                            ? setViewMoreState({
                                ...viewMoreState,
                                count: viewMoreState.count + 10,
                              })
                            : setViewMoreState({
                                id: chatContent.chat_id,
                                count: 20,
                              });
                        }}
                      >
                        View More
                      </Button>
                    ) : (
                      <></>
                    )}
                  </div>
                ) : (
                  <></>
                )}
                {chatContent.details ? (
                  <div className="chatscreen-content-details">
                    {Object.keys(chatContent.details).map(
                      (key, detailsIndex) => (
                        <div>
                          <span>{key}</span>
                          <span
                            style={{
                              margin: "0px 4px",
                            }}
                          >
                            :
                          </span>
                          <span>{chatContent.details[key]}</span>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </div>
              {/* -------------------- */}
              {chatContent.sender == "user" ? (
                <span className="chatscreen-content-icon">
                  <img src={UserIcon} />
                </span>
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </div>
      <div
        className="chatscreen-typing-container"
        style={{
          justifyContent: botTyping ? "flex-start" : "flex-end",
          opacity: userTyping || botTyping ? "1" : "0",
        }}
      >
        {botTyping ? (
          <span className="chatscreen-typing-icon">
            <img src={ChatBotIcon} />
          </span>
        ) : (
          <></>
        )}
        <div className="chatscreen-typing">
          <span className="chatscreen-typing-dots"></span>
          <span className="chatscreen-typing-dots"></span>
          <span className="chatscreen-typing-dots"></span>
        </div>
        {botTyping ? (
          <></>
        ) : (
          <span className="chatscreen-typing-icon">
            <img src={UserIcon} />
          </span>
        )}
      </div>
      <div className="chatscreen-footer">
        <form onSubmit={handleSubmit}>
          <div className="chatscreen-footer-input">
            <TextField
              onChange={(e) => {
                setInputMessage(e.target.value);
              }}
              id="standard-required"
              disabled={botTyping}
              value={inputMessage}
              variant="standard"
              style={{
                width: "90%",
              }}
              onFocus={(e) => setUserTyping(true)}
            />
          </div>
          <div className="chatscreen-footer-btn">
            <button type="submit" className="chatscreen-send">
              <SendIcon />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
