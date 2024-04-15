import React, { useState, useRef } from 'react'
import Button from "../Button2";

export const Input = () => {
  const [formData, setFormData] = useState({ message_content: '' });
  const fname = useRef("");
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fname.current.value = "";
    try {
      const response = await fetch('/api/chatPage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Could not send message');
      }
 
    } catch (err) {
      console.error('Error while sending message',err);
    }
  };

  return (
    <div> {/* entering messages */}
      <form onSubmit={handleSubmit}>
        <div className='flex h-12 p-2 bg-slate-50 justify-between items-center'>
          <input type="text"
            id="message_content"
            name="message_content"
            ref={fname}
            placeholder='Enter your message...'
            value={formData.message_content}
            onChange={handleChange}
            className="w-full  bg-slate-50"
             /> {/* input bar */}
        <div className="flex items-center gap-2"> {/* send button */}
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Send</button>
          </div>
          </div>
        </form>
    </div>
  )
}

export default Input
