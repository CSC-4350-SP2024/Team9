import React from 'react'
import Chat from '../components/chat/chat.jsx'
import Sidebar from '../components/chat/sidebar.jsx'
import Chats from '../components/chat/chats.jsx'

export const chatPage = () => {
  return (
    <div class="bg-blue-300 h-screen flex items-center justify-center"> {/* home */}
      <div class="border-solid rounded-xl border-white h-5/6 w-10/12 flex"> {/* container */}
          <Chats/>
          <Chat />
          <Sidebar />
      </div>
    </div>
    
  )
}

export default chatPage