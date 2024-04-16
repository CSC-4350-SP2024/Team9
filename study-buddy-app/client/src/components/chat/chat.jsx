import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import Messages from './messages.jsx'
import Input from './input.jsx'

export const Chat = () => {

  const [courseName, setCourseName] = useState([]);
  const { chatID } = useParams();

  // const messages = [{id: 1, senderUsername: 'bob', messageContent: 'hello', timestamp: '12:00'}]

  const fetchInfo = async () => {
    return await fetch(`/api/getCourseName/${chatID}`)
      .then((res) => res.json())
      .then((d) => setCourseName(d))
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className='flex-1 fixed w-11/12 h-full top-20'> {/* chat */}
      
        <div className="h-12 bg-slate-300 flex items-center justify-between p-2 text-xl font-bold"> {/* chat info bar */}
          {courseName.class_name}
        </div>
      <div className="bg-slate-100 p-2 h-[calc(100%-177px)]">  {/* messages */}
        <Messages />
      </div>
      <div className="inputBar">
        <Input />
     </div> 
      </div>
  )
}

export default Chat