import React from 'react'
import { useFeedback } from '../context/FeedbackContext'
import { useNavigate } from 'react-router-dom';


const FeedbackForm: React.FC = () => {
  
    const {data,updateData, isFormValid} = useFeedback();
    const navigate = useNavigate();

    const handelChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name,value} = e.target;
        updateData({[name] : name === "rating" ? Number(value):value});
    };

    const handelSubmit = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        e.preventDefault();
        if(isFormValid()){
            navigate('/summary');
        }else{
            alert("Please fill all fildes before Submitting!!");
        }
    };

  return (
    <div style={{maxWidth:"400px",margin:"0 auto"}}>
      <h2>Feedback Form</h2>
      <form onSubmit={handelSubmit}>
        <div>
            <label>Name:</label>
            <input type='text' name='name' value={data.name} onChange={handelChange}/>
        </div>
        <div>
            <label>Email:</label>
            <input type='email' name='email' value={data.email} onChange={handelChange}/>
        </div>
        <div>
            <label>Rating(1-5):</label>
            <input type='number' name='rating' value={data.rating} min={1} max={5} onChange={handelChange}/>
        </div>
        <div>
            <label>Feedback:</label>
            <textarea  name='feedback' value={data.feedback}  onChange={handelChange}/>
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default FeedbackForm
