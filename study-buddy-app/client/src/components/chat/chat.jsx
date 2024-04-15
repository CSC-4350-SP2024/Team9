import React from 'react'
import Messages from './messages.jsx'
import Input from './input.jsx'

export const chat = () => {
  return (
    <div className='flex-1 fixed w-11/12 h-full top-20'> {/* chat */}
      <div className="h-12 bg-slate-300 flex items-center justify-between p-2 text-xl font-bold"> {/* chat info bar */}
        CSC 101
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

export default chat