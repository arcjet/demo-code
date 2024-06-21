import { v4 as uuidv4 } from "uuid";
import { useEffect, useRef, useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      id: uuidv4(),
      user: "Merlin",
      text: "Welcome to MerlinBot! Ask me anything.",
    },
  ]);
  const [thinking, setThinking] = useState(false);
  const formRef = useRef();
  const textareaRef = useRef();

  const handleSendMessage = async (message) => {
    setMessages((currentMessages) => [
      ...currentMessages,
      { id: uuidv4(), user: "You", text: message },
    ]);
    setThinking(true);

    const response = await fetch("/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, conversation: messages }),
    });
    const data = await response.json();

    if (!response.ok) {
      setThinking(false);
      setMessages((currentMessages) => [
        ...currentMessages,
        { id: uuidv4(), user: "System", text: data.error },
      ]);
    } else {
      setThinking(false);
      setMessages((currentMessages) => [
        ...currentMessages,
        { id: uuidv4(), user: "Merlin", text: data.message },
      ]);
    }
  };

  // Generate a string that animates the following values every 1.5 seconds "." -> ".." -> "..."
  const dots = [".", "..", "..."];
  const [dotIndex, setDotIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDotIndex((prevDotIndex) => (prevDotIndex + 1) % dots.length);
    }, 300);

    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  // "Send" key symbols based on the platform
  const [keySymbol, setKeySymbol] = useState("Ctrl");
  useEffect(() => {
    if (navigator.platform.includes("Mac")) {
      setKeySymbol("⌘");
    }
    textareaRef.current.focus();
  }, []);

  // Scroll to bottom when new messages are added
  const bottomRef = useRef();
  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col overflow-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-2 rounded-lg ${
              message.user === "You"
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-300 self-start"
            }`}
          >
            <span className="font-bold pr-2">{message.user}</span>
            <pre style={{ fontFamily: "inherit", whiteSpace: "pre-wrap" }}>
              {message.text}
            </pre>
          </div>
        ))}
        {thinking && (
          <div className="p-2 rounded-lg bg-gray-300 self-start">
            <span className="font-bold pr-2">Merlin is thinking</span>
            <pre style={{ fontFamily: "inherit" }}>{dots[dotIndex]}</pre>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="p-4 bg-white border-t border-gray-200">
        <form
          ref={formRef}
          onSubmit={(event) => {
            event.preventDefault();
            handleSendMessage(event.target.message.value);
            event.target.message.value = "";
          }}
          className="flex space-x-2"
        >
          <textarea
            ref={textareaRef}
            name="message"
            className="flex-grow rounded-lg border p-2"
            onKeyDown={async (event) => {
              if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
                event.preventDefault();
                handleSendMessage(event.target.value);
                event.target.value = "";
              }
            }}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg px-4 py-2"
          >
            Send ({keySymbol} Enter)
          </button>
        </form>
      </div>
    </div>
  );
}
