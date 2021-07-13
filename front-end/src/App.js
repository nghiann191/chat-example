import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import socketIOClient from "socket.io-client";
import "./App.styles.js";
import Wrapper from "./App.styles.js";
import { format, isToday } from "date-fns";

const host = "http://localhost:8080";

function App() {
  const [mess, setMess] = useState([]);
  const [message, setMessage] = useState("");
  const [id, setId] = useState();

  const socketRef = useRef();
  const messagesEnd = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient.connect(host);

    socketRef.current.on("getId", (data) => {
      setId(data);
    });

    socketRef.current.on("sendDataClient", (dataGot) => {
      setMess((oldMsgs) => [...oldMsgs, dataGot.data]);
      scrollToBottom();
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = useCallback(() => {
    if (message !== null) {
      const msg = {
        content: message,
        id: id,
        time: format(new Date(), "yyyy/MM/dd HH:mm"),
      };
      socketRef.current.emit("sendDataClient", msg);

      /*Khi emit('sendDataClient') bên phía server sẽ nhận được sự kiện có tên 'sendDataClient' và handle như câu lệnh trong file index.js
           socket.on("sendDataClient", function(data) { // Handle khi có sự kiện tên là sendDataClient từ phía client
             socketIo.emit("sendDataServer", { data });// phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
           })
     */
      setMessage("");
    }
  }, [id, message]);

  const timeChat = useCallback((time, index) => {
    if (!time) return;

    if (isToday(time)) {
      return format(time, "HH:mm");
    }
    return format(time, "yyyy/MM/dd HH:mm");
  }, []);

  const renderMess = useMemo(
    () =>
      mess.map((m, index) => (
        <div key={index}>
          <div className="time-chat">{timeChat(new Date(m.time), index)}</div>
          <div
            className={`${m.id === id ? "your-item" : "other-item"} chat-item`}
          >
            <div className={`${m.id === id ? "your-message" : "other-people"}`}>
              {m.content}
            </div>
          </div>
        </div>
      )),
    [id, mess, timeChat]
  );
  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  };

  const onEnterPress = useCallback(
    (e) => {
      if (e.keyCode === 13 && e.shiftKey === false) {
        sendMessage();
      }
    },
    [sendMessage]
  );

  return (
    <Wrapper>
      <div className="box-chat">
        <div className="box-chat_message">
          {renderMess}
          <div style={{ float: "left", clear: "both" }} ref={messagesEnd}></div>
        </div>

        <div className="send-box">
          <input
            value={message}
            onKeyDown={onEnterPress}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Nhập tin nhắn ..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </Wrapper>
  );
}

export default App;
