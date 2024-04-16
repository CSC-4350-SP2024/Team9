import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";


const Chats = () => {
const { chatID } = useParams();
const [classes, setClasses] = useState([]);

  const fetchInfo = async () => {
    return await fetch('/api/getUserClasses')
      .then((res) => res.json())
      .then((d) => setClasses(d))
  };

  useEffect(() => {
    fetchInfo();
  }, [classes]);

   const changeParameter=(c)=>{
     chatID = c;
    }

  return (
      <div className='left-0 top-20 fixed bg-slate-200 w-1/12 h-full'> {/* left sidebar */}
      <h1 className='font-bold text-lg p-4'>Chats</h1>
      
      {classes.map((classItem) => (
       
        <Link to={`/chatPage/${classItem.class_id}`} onClick={() => changeParameter(classItem.class_id)}>
          <div className='flex items-center  h-12 p-3 gap-2 justify-left hover:bg-slate-300'> {/* other chats */}
          {/* <img src="" alt="" className='bg-black h-7 w-7 rounded-full object-cover' /> profile pic */}
          
          <span className='flex gap-2 p-0'>{classItem.class_name}</span></div></Link>
        
      ))}
    </div>
  )
}

export default Chats