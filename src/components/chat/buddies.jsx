import React from 'react'

const friends = () => {
  return (
    <div>
      <h1 className='font-bold text-lg p-4'>Buddies</h1>  {/* bar title */}
        <div className='flex items-center  h-12 p-3 gap-2 justify-left text-white hover:bg-blue-300'> {/* buddy */}
            <img src="" alt="" className ='bg-black h-7 w-7 rounded-full object-cover'/> {/* profile pic */}
          
            <span className='flex gap-2 p-0'>Username</span>
      </div>
       <div className='flex items-center  h-12 p-3 gap-2 justify-left text-white hover:bg-blue-300'>
            <img src="" alt="" className ='bg-black h-7 w-7 rounded-full object-cover'/>
          
            <span className='flex gap-2 p-0'>Username</span>
      </div>
       <div className='flex items-center h-12 p-3 gap-2 justify-left text-white hover:bg-blue-300'>
            <img src="" alt="" className ='bg-black h-7 w-7 rounded-full object-cover'/>
          
            <span className='flex gap-2 p-0'>Username</span>
        </div>
    </div>
  )
}

export default friends