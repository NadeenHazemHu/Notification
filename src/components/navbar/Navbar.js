import React, { useEffect, useState } from "react";
import Notification from "../../img/notification-bell.svg";
import Message from "../../img/message.svg";
import Settings from "../../img/settings.svg";
import "./navbar.css";
function Navbar({ socket }) {
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState([]);
  const [open, setOpen] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);

  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
    socket.on("getText", (data) => {
      setMessage((prev) => [...prev, data]);
    });
  }, [socket]);
  // useEffect(() => {

  //   });
  // }, [socket]);
  console.log(message);
  const displayNotification = ({ senderName, type }) => {
    let action;
    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }
    return (
      <span className="notification">{`${senderName} ${action} your post`}</span>
    );
  };
  const displayMessage = ({ senderName, text }) => {
    console.log("nav");
    return <span className="notification">{`${senderName}: ${text} `}</span>;
  };
  const handelRead = () => {
    setNotifications([]);
    setOpen(false);
  };
  return (
    <div className="navbar">
      <span className="logo">Lama App</span>
      <div className="icons">
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Notification} className="iconImg" alt="" />
          {notifications.length > 0 && (
            <div className="counter">{notifications.length}</div>
          )}
        </div>
        <div className="icon" onClick={() => setOpenMessage(!openMessage)}>
          <img src={Message} className="iconImg" alt="" />

          {message.length > 0 && (
            <div className="counter">{message.length}</div>
          )}
        </div>
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Settings} className="iconImg" alt="" />{" "}
          <div className="counter">2</div>
        </div>
      </div>
      {open && (
        <div className="notifications" style={{ backgroundColor: "green" }}>
          {notifications.map((n) => displayNotification(n))}
          <button className="nButton" onClick={handelRead}>
            Mark as read
          </button>
        </div>
      )}{" "}
      {openMessage && (
        <div className="notifications">
          <div>{message.map((n) => displayMessage(n))}</div>
          {/* <button className="nButton" onClick={handelRead}>
          Mark as read
        </button> */}
        </div>
      )}
    </div>
  );
}

export default Navbar;
