import React from 'react'
import Button from "../Button2";

export const input = () => {
  return (
    <div className = 'flex h-12 p-2 bg-blue-100 justify-between items-center'> {/* entering messages */}
        <input type="text" placeholder='Enter your message...' className="w-full  bg-blue-100" /> {/* input bar */}
        <div className="flex items-center gap-2"> {/* send button */}
            <Button type="submit" variant="success">Send</Button>
        </div>
    </div>
  )
}

export default input
