import React from 'react'
import Button from "../Button3";

const profilebar = () => {
  return (
      <div className='flex items-center bg-blue-700 h-16 p-2  text-white'> {/* user's own info and logout */}
              <img src="" alt="" className='bg-black h-7 w-7 rounded-full object-cover' /> {/* profile picture */}
              <span className='gap-2 p-2 w-[calc(100%-120px)]'>Username</span>
          <Button type='submit' className=''>Logout</Button>
      </div>
  )
}

export default profilebar