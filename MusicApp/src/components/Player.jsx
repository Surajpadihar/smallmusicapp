import React, { useEffect, useState } from 'react'
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; // icons for play and pause
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"; // icons for next and previous track
import { IconContext } from "react-icons";
import useSound from "use-sound";
import song from '../assets/song.mp3'
import imgg from '../assets/w123.jpg'


const Player = () => {
    const [isPlaying,setIsPlaying] = useState(false);
     const [t,setT]=useState({});

    const [curTime,setCurrTime] = useState({
        min:"",
        sec:""
    })
     

    const[seconds,setSeconds] = useState("");


    const [play,{pause,duration,sound}] = useSound(song);

    const Playingbtn = ()=>{
        if(isPlaying){
            pause();
            setIsPlaying(false);
        }
        else{
            play();
            setIsPlaying(true)
        }
    }
    
    

    useEffect(()=>{
        const sec = duration/1000;
        const min = Math.floor(sec/60);
        const remainingSec = Math.floor(sec%60);
        
        setT({min,remainingSec});
    },[])

    useEffect(()=>{
        const interval = setInterval(()=>{
            if(sound){
                setSeconds(sound.seek([]));
                const min = Math.floor(sound.seek([])/60);
                const sec = Math.floor(sound.seek([])%60);
                setCurrTime({
                    min,
                    sec
                })
            }
        },1000)
        return () => clearInterval(interval);
    },[sound])

  return (
    <div className='flex justify-center items-center text-white'>

        <div className='bg-gray-600  w-1/4 justify-center items-center shadow-lg rounded-lg'>
            <h1 className='text-2xl mt-5 '>Playin Music</h1> 
            <div className="mt-5 mb-5 flex flex-col justify-center items-center">
                <img className='w-40 rounded-lg shadow-sm' src={imgg} alt="missing" />
               
                    <h1 className='text-2xl mt-2'>295</h1>
                    <h1 >Sidhu MosseWala</h1>
                
            </div>
            
            <div className="">
                <div className="flex justify-between ">
                    <p className='ml-16'>{curTime.min}:{curTime.sec}</p>
                    <p className='mr-16'>{t.min}:{t.remainingSec}</p>
                </div>
                <input type="range" 
                 min="0"
                 max={duration / 1000}
                 default="0"
                 value={seconds}
                 className=""
                 onChange={(e) => {
                   sound.seek([e.target.value]);
                 }}
                />
            </div>

            <div className="my-3 ">
                <button className=''>
                <IconContext.Provider value={{ size: "3em", color: "white" }}>
                  <BiSkipPrevious />
                </IconContext.Provider>
                </button>
                {!isPlaying ? (
                   <button className='' onClick={Playingbtn}>
                     <IconContext.Provider value={{ size: "3em", color: "white" }}>
                         <AiFillPlayCircle />
                     </IconContext.Provider>
                   </button> 
                ):(
                    <button className='' onClick={Playingbtn}>
                      <IconContext.Provider value={{ size: "3em", color: "white" }}>
                         <AiFillPauseCircle />
                      </IconContext.Provider>
                    </button>
                )

                }
                <button className=''>
                    <IconContext.Provider value={{ size: "3em", color: "white" }}>
                         <BiSkipNext />
                    </IconContext.Provider>
                </button>
            </div>
        </div>
      
    </div>
  )
}

export default Player
