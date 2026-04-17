export default function ChatMessage({ chat }) {
  const isSender = chat.role === "user";

  return (
    <div
      className={`message ${isSender ? "user-message" : "bot-message"} ${
        chat.isError ? "error" : ""
      }`}
    >
      <div className="message-text-container">
        <div className="message-text" style={{ whiteSpace: "pre-wrap" }}>
          {chat.text}
        </div>
      </div>
    </div>
  );
}