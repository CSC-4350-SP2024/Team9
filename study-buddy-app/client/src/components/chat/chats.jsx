import React from 'react'

const chats = () => {
  return (
      <div className='left-0 top-20 fixed bg-blue-400 w-1/12 h-full'> {/* left sidebar */}
          <h1 className='font-bold text-lg p-4'>Chats</h1>
          <div className='flex items-center  h-12 p-3 gap-2 justify-left text-white hover:bg-blue-300'> {/* other chats */}
            <img src="" alt="" className ='bg-black h-7 w-7 rounded-full object-cover'/> {/* profile pic */}
          
            <span className='flex gap-2 p-0'>CSC 101</span>
      </div>
    </div>
  )
}

export default chats