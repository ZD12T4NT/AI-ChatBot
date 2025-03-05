"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../store/chatSlice";
import { RootState } from "../store"; 
import axios from "axios";
import React from "react";

export default function ChatBox() {
    const [input, setInput] = useState("");
    const messages = useSelector((state: RootState) => state.chat.messages);
    const dispatch = useDispatch();

    const sendMessage = async () => {
        if (!input.trim()) return;

        dispatch(addMessage({ role: "user", content: input }));

        try {
            const res = await axios.post("/api/chat", { message: input });
            dispatch(addMessage({ role: "assistant", content: res.data.reply }));
        } catch (error) {
            dispatch(addMessage({ role: "assistant", content: "Error: Unable to get response." }));
        }

        setInput("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault(); // To prevent a new line from being added
            sendMessage();
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto p-4 border border-gray-950 rounded-lg shadow-md bg-gray-950">
            <div className="h-80 overflow-y-auto border-b border-b-gray-500 p-2">
                {messages.map((msg, index) => (
                    <div key={index} className={`p-2 my-1 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                        <span className={msg.role === "user" ? "bg-white text-black p-2 rounded-lg" : "bg-gray-200 p-2 rounded-lg text-black"}>
                            {msg.content}
                        </span>
                    </div>
                ))}
            </div>
            <div className="flex mt-2">
                <input
                    type="text"
                    className="flex-1 p-2 border rounded mr-2 text-white"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                />
                <button className="bg-white text-black p-2 rounded-full hover:bg-gray-700 hover:text-white transition h-full cursor-pointer" onClick={sendMessage}>
                    <span>
                    &#8599;
                    </span>
                </button>
            </div>
        </div>
    );
}
