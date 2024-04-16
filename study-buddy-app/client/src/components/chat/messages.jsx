import React, { useState, useEffect } from 'react'
import Message from './message'

const Messages = () => {
  const [messages, setMessages] = useState([]);
  // const messages = [{id: 1, senderUsername: 'bob', messageContent: 'hello', timestamp: '12:00'}]

  const fetchInfo = async () => {
    return await fetch('/api/getMessages')
      .then((res) => res.json())
      .then((d) => setMessages(d))
  };

  useEffect(() => {
    fetchInfo();
  }, [messages]);

  return (
    <div>
      {messages.map((m) => (
        <div key={m.id} className='flex gap-3 overflow-hidden pb-3.5'>
          <div className="flex flex-col"> {/* profile pic and timestamp, need to modify timestamp format */} 
            {/* <img src="" alt="" className='w-10 h-10 bg-black rounded-full' /> */}
            <span className='text-black-100 font-light mb-5'>{m.timestamp}</span>
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