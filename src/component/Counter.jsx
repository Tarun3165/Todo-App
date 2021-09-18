import {useState,useEffect, useRef} from "react"

 const Counter = () => {
    const [count, setCount] = useState(0);
    const timerRef = useRef(null);
    const [started,setStarted]=useState(false)

    const startTimer = () => {
      
        
        if (started) {
            return
        }
        setStarted(true)
        timerRef.current= setInterval(() => {
            setCount((prevVal) => {
                return prevVal + 1;
            });
        }, 1000);
        
    }
        
       

    return (
        <div>
            <h2>Counter: {count}</h2>
            <button onClick={() => {
                setStarted(false)
                clearInterval(timerRef.current)
            }}
            >Pause</button>

            {/* <button onClick={
                clearInterval(timerRef.current)
            }>start</button>

            <button onClick={
                clearInterval(timerRef.current)
            }>Pause</button> */}
        </div>
    )
}

export default Counter