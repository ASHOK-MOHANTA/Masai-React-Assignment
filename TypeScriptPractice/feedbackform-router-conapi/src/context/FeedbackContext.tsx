import React, { createContext, useContext, useState, type ReactNode } from 'react'

interface FeedbackData{
    name: string,
    email: string,
    rating: number,
    feedback: string;
}

interface FeedbackType{
    data: FeedbackData;
    updateData: (data: Partial<FeedbackData>)=> void;
    isFormValid: ()=> boolean;
}

const FeedbackContext = createContext<FeedbackType | undefined>(undefined);

export const FeedbackProvider : React.FC<{children:ReactNode}> = ({children}) =>{
    const [data,setData] = useState<FeedbackData>({
        name:"",
        email:"",
        rating:0,
        feedback:"",
    });

    const updateData = (newData: Partial<FeedbackData>)=>{
        setData(prev =>({...prev,...newData}));
    };

    const isFormValid = ()=>{
        return data.name !== "" && data.email !== "" && data.rating !== 0 && data.feedback !== "";
    };

    return (
    <FeedbackContext.Provider value={{data,updateData,isFormValid}}>
      {children}
    </FeedbackContext.Provider>
  );
};


export const useFeedback  = ()=>{
    const context = useContext(FeedbackContext);
    if(!context) throw new Error("use Feedback most be used within the Feedback Provider");
    return context; 
}
