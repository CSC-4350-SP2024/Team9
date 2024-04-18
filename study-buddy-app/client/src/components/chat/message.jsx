import React from 'react'

const message = () => {
  return (
      <div className='flex gap-3 overflow-hidden'> {/* individual messages */}
          <div className="flex flex-col"> {/* profile pic and timestamp */}
              <img src="" alt="" className='w-10 h-10 bg-black rounded-full' />
              <span className='text-gray-500 font-light mb-5'>just now</span>
          </div>
          <span className='username'>Username</span>
          <div className="w-4/5 flex flex-col gap-5"> {/* message content */}
              <p className='bg-blue-100 p-2 w-full'>hello</p>
          </div>
      </div>
  )
}

export default message