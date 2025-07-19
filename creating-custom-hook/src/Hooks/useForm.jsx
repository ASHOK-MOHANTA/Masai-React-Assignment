import React, { useState } from 'react'

const useForm = (initialValue) => {

    const [value,setValue] = useState(initialValue);
    const handelChanges = (e)=>{
        const {name,value} = e.target;
        setValue((prevValue)=>({
            ...prevValue,[name]:value,
        }))
    };

    const resetForm = ()=> setValue(initialValue)

  return {value,handelChanges,resetForm}
}

export default useForm
