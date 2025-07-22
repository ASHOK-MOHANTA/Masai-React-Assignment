import React, { useEffect } from 'react'
import { useFeedback } from '../context/FeedbackContext'
import { useNavigate } from 'react-router-dom';

const Summary: React.FC = () => {

    const {data, isFormValid} = useFeedback();
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(!isFormValid()){
            navigate('/');
        }
    },[isFormValid,navigate])

  return (
    <div style={{padding:"2rem"}}>
        <h2>Feedback Summary</h2>
        <p><strong>Name:</strong>{data.name}</p>
        <p><strong>Email:</strong>{data.email}</p>
        <p><strong>Rating:</strong>{data.rating}</p>
        <p><strong>Feedback:</strong>{data.feedback}</p>
    </div>
  );
};

export default Summary
