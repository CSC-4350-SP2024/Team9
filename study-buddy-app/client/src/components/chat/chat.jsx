import React from 'react'
import Messages from './messages.jsx'
import Input from './input.jsx'

export const chat = () => {
  return (
    <div className='flex-1 fixed w-5/6 h-full top-20'> {/* chat */}
      <div className="h-12 bg-blue-500 flex items-center justify-between p-2 text-white"> {/* chat info bar */}
        chat name
      </div>
      <div className="bg-blue-200 p-2 h-[calc(100%-177px)]">  {/* messages */}
        <Messages />
      </div>
      <div className="inputBar">
        <Input />
     </div> 
      </div>
  )
}

export default chat