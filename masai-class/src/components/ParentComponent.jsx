import { useState } from "react";


function ParentComponent(){
    const [count,setCount] = useState(0);
    return(
        <>
        <ChildComponent count ={count} setCount={setCount}/>
        </>
    )
}


function ChildComponent({count,setCount}){
    return(
        <div>
            <p>Count:{count}</p>
            <button onClick={()=> setCount(count+1)} >Increase</button>
        </div>
    )
}