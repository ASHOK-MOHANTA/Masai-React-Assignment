import React, { useState } from 'react';

interface FeedbackForm {
    name: string;
    email: string;
    rating: number | "";
    feedback: string;
}

const FeedbackForm: React.FC = () => {
    const [formData, setFormData] = useState<FeedbackForm>({
        name: "",
        email: "",
        rating: "",
        feedback: "",
    });

    const [submited, setSubmited] = useState<boolean>(false);
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'rating' ? Number(value) : value,
        }));
    };

    const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { name, email, rating, feedback } = formData;
        if (!name || !email || rating === "" || !feedback) {
            alert("Please fill the all fields.");
            return;
        }
        setSubmited(true);
        setFormData({ name: "", email: "", rating: "", feedback: "" });
    };

    return (
        <div style={{ backgroundColor: '#51da71ff',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    color: '#fff',
    textAlign: 'center',}}>
            
            {!submited ? (
                
                <form onSubmit={handelSubmit}>
                    <h2>Customer Feedback Form</h2>
                    <div>
                        <label>Name:</label>
                        <input type='text' name='name' value={formData.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type='email' name='email' value={formData.email} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Rating(1-5):</label>
                        <input type='number' name='rating' min={1} max={5} value={formData.rating} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Feedback:</label>
                        <textarea
                        name='feedback'
                        value={formData.feedback}
                        onChange={handleChange}
                        required
                        />
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            ):(
                <div
  style={{
    backgroundColor: '#80a5409c',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    color: '#fff',
    textAlign: 'center',
  }}
>
  <h1>Thank You For Your Feedback</h1>
  <p>Your response has been recorded.</p>
</div>

)}
 </div>
    );
}

export default FeedbackForm
