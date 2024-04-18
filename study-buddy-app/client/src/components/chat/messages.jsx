import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import Message from './message'

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { chatID } = useParams();

  const fetchInfo = async () => {
    return await fetch(`/api/getMessages/${chatID}`)
      .then((res) => res.json())
      .then((d) => setMessages(d))
  };

  useEffect(() => {
    fetchInfo();
  }, [messages]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: '2-digit', minute: '2-digit', hour12: true };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

  return (
    <div>
      {messages.map((m) => (
        <div key={m.id} className='flex gap-3 overflow-hidden pb-3.5'>
          <div className="flex flex-col"> {/* profile pic and timestamp, need to modify timestamp format */} 
            {/* <img src="" alt="" className='w-10 h-10 bg-black rounded-full' /> */}
            <span className='text-black-100 font-light mb-5'>{formatDate(m.timestamp)}</span>
          </div>
          <span className='username'>{m.sender_username}</span>
          <div className="w-4/5 flex flex-col gap-5"> {/* message content */}
            <p className='bg-white shadow-md p-2 w-full'>{m.message_content}</p>
          </div>
        </div>
      ))}
      </div>
  )
}

export default Messages