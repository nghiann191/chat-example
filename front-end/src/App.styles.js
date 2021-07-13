import styled from "styled-components";

const Wrapper = styled.div`
  .box-chat {
    position: relative;
    max-width: 500px;
    margin: auto;
    background-color: #707070;

    .box-chat_message {
      padding: 8px;
      height: calc(100vh - 48px);
      overflow: scroll;
      padding-bottom: 40px;

      &::-webkit-scrollbar {
        display: none;
      }

      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */

      .time-chat {
        color: #fff;
        font-size: 12px;
        text-align: center;
      }

      .chat-item {
        width: 100%;

        .your-message,
        .other-people {
          word-break: break-all;
          color: #fff;
          padding: 10px;
          border-radius: 8px;
          margin: 3px 0;
          width: 200px;
        }

        .your-message {
          background-color: #01d5fa;
        }

        .other-people {
          background-color: #bcbcbc;
        }
      }

      .your-item {
        display: flex;
        justify-content: flex-end;
      }
    }

    .send-box {
      width: 100%;
      height: 37px;
      display: flex;
      justify-content: space-between;
      position: absolute;
      bottom: 0;

      input {
        width: calc(100% - 50px);
        border: 1px solid #01d5fa;

        &:focus-visible {
          outline: none;
          border-color: #ff0000;
        }
      }

      button {
        width: 50px;
        color: #fff;
        background-color: #01d5fa;
        border: 1px solid #01d5fa;
      }
    }
  }
`;

export default Wrapper;
