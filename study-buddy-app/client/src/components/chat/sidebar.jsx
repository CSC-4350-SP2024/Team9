import React from 'react'
import Profilebar from './profilebar'
import Buddies from './buddies'

const sidebar = () => {
  return (
    <div className='flex-2 right-0 top-20 fixed bg-blue-400 w-1/12 h-full'> {/* right sidebar */}
      <div className='h-[calc(100%-144px)]'> {/* buddies */}
        <Buddies />
      </div>
      <Profilebar />
    </div>
  )
}

export default sidebar