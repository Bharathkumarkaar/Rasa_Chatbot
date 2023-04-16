import React, { useState, useRef, useEffect } from "react";
import "./ChatScreen.css";
import DigiverzLogo from "./Digiverz-logo.png";
import DigiverzMenu from "./menu.png";
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
  const [chat, setChat] = useState([
    {
      sender: "user",
      sender_id: "Eyuwankg",
      msg: "Hi",
      actions: [],
      links: [],
    },
    {
      sender: "bot",
      sender_id: "",
      msg: "How Are Your???",
      actions: ["Pending Request", "100000243", "Pending Request"],
      links: [
        {
          link: "https://chat.openai.com/",
          tag: "Chat GPT",
        },
        {
          link: "https://www.flaticon.com/",
          tag: "Flat Icons",
        },
        {
          link: "https://chat.openai.com/",
          tag: "Chat GPT",
        },
        {
          link: "https://www.flaticon.com/",
          tag: "Flat Icons",
        },
      ],
    },
    // {
    //   sender: "user",
    //   sender_id: "Eyuwankg",
    //   msg: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    //   actions: [],
    //   links: [
    //   ],
    // },
    // {
    //   sender: "bot",
    //   sender_id: "Eyuwankg",
    //   msg: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    //   actions: ["Pending Request", "100000243"],
    //   links: [
    //     {
    //       link: "https://chat.openai.com/",
    //       tag: "Chat GPT",
    //     },
    //     {
    //       link: "https://www.flaticon.com/",
    //       tag: "Flat Icons",
    //     },
    //   ],
    // },
    // {
    //   sender: "user",
    //   sender_id: "Eyuwankg",
    //   msg: "Im Fine! Bro",
    //   actions: [],
    //   links: [
    //   ],
    // },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const chatScreenContent = useRef();

  const stylecard = {
    maxWidth: "35rem",
    border: "1px solid black",
    paddingLeft: "0px",
    paddingRight: "0px",
    borderRadius: "30px",
    boxShadow: "0 16px 20px 0 rgba(0,0,0,0.4)",
  };
  const styleHeader = {
    height: "4.5rem",
    borderBottom: "1px solid black",
    borderRadius: "30px 30px 0px 0px",
    backgroundColor: "#8012c4",
  };
  const styleBody = {
    paddingTop: "10px",
    height: "28rem",
    overflowY: "a",
    overflowX: "hidden",
  };

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
      actions: [],
      links: [],
    };

    setChat((chat) => [...chat, request_temp]);
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
      msg: actionValue,
      actions: [],
      links: [],
    };

    setChat((chat) => [...chat, request_temp]);
    setBotTyping(true);
    rasaAPI(name, actionValue);
  };

  const rasaAPI = async function handleClick(name, msg) {
    //chatData.push({sender : "user", sender_id : name, msg : msg});

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
          const recipient_msg = JSON.parse(temp["text"]);
          console.log(recipient_msg)
          const response_temp = {
            sender: "bot",
            recipient_id: recipient_id,
            msg: recipient_msg["msg"],
            actions: recipient_msg["pr"] ? recipient_msg["pr"] : [],
            links: recipient_msg["links"] ? recipient_msg["links"] : [],
          };
          setBotTyping(false);
          setUserTyping(false);
          console.log(chat);
          setChat((chat) => [...chat, response_temp]);
          // scrollBottom();
        }
      });
  };

  // return (
  //     <div>

  //     <div className="container">
  //     <div className="row justify-content-center">

  //             <div className="card" style={stylecard}>
  //                 <div className="cardHeader text-white" style={styleHeader}>
  //                     <h1 style={{marginBottom:'0px'}}>AI Assistant</h1>
  //                     {botTyping ? <h6>Bot Typing....</h6> : null}

  //                 </div>
  //                 <div className="cardBody" id="messageArea" style={styleBody}>

  //                     <div className="row msgarea">
  //                         {chat.map((user,key) => (
  //                             <div key={key}>
  //                                 {user.sender==='bot' ?
  //                                     (

  //                                         <div className= 'msgalignstart'>
  //                                             <h5 className="botmsg">{user.msg}</h5>
  //                                         </div>

  //                                     )

  //                                     :(
  //                                         <div className= 'msgalignend'>
  //                                             <h5 className="usermsg">{user.msg}</h5>
  //                                         </div>
  //                                     )
  //                                 }
  //                             </div>
  //                         ))}

  //                     </div>

  //                 </div>
  //                 <div className="cardFooter text-white" style={styleFooter}>
  //                     <div className="row">
  //                         <form style={{display: 'flex'}} onSubmit={handleSubmit}>
  //                             <div className="col-10" style={{paddingRight:'0px'}}>
  //                                 <input onChange={e => setInputMessage(e.target.value)} value={inputMessage} type="text" className="msginp"></input>
  //                             </div>
  //                             <div className="col-2 cola">
  //                                 <button type="submit" className="circleBtn" ><IoMdSend className="sendBtn" /></button>
  //                             </div>
  //                         </form>
  //                     </div>
  //                 </div>
  //             </div>

  //     </div>
  //     </div>

  //   </div>
  //  )
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

              <div
                className="chatscreen-content-chat"
                style={{
                  alignItems:
                    chatContent.sender == "bot" ? "flex-start" : "flex-end",
                }}
              >
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
                <div className="chatscreen-content-links">
                  {chatContent.links.map((link, linkIndex) => (
                    <a href={link.link} target="_blank">
                      {link.tag}
                      <img src={ExternalLink} />
                      {/* <LaunchIcon/> */}
                    </a>
                  ))}
                </div>
                <div
                  className="chatscreen-content-actions"
                  style={{
                    justifyContent:
                      chatContent.sender == "bot" ? "flex-start" : "flex-end",
                  }}
                >
                  {chatContent.actions.map((action, actionIndex) => (
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
                </div>
              </div>
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
