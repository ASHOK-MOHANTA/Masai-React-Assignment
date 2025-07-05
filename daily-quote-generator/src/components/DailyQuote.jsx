import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const DailyQuote = ()=>{
    const [quote,setQuote] = useState({content:"",author:""})

    const fetchQuote = async ()=>{
        try{
            const response = await fetch("https://api.quotable.io/random");
            const data = await response.json();
            console.log(data)
            setQuote({content:data.content,author:data.author});
        }catch(err){
            setQuote({content:"Failed to fatch Quote",author:"Failed to fatch author"});
        }
    };

    useEffect(()=>{
        fetchQuote();
        const intervalId = setInterval(fetchQuote,30000);
        return ()=>clearInterval(intervalId);
    },[]);

    return(
        <div style={styles.container}>
            <div style={styles.quotesBox}>
                <p style={styles.quoteText}>"{quote.content}"</p>
                <p style={styles.author}>{quote.author}</p>
                <button onClick={fetchQuote} style={styles.button}>Get New Quote</button>
            </div>
        </div>
    );

};

const styles = {

    container:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height: "100vh",
        background:"#f0f8ff"
    },
    quotesBox:{
        textAlign:"center",
        maxWidth:"600px",
        padding:"2rem",
        background:"#fff",
        borderRadius:"12px",
        boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    },
    quoteText:{
        fontSize:"1.5rem",
        fontStyle: "italic",
        marginBottom: "1rem"
    },
    author:{
        fontSize: "1rem",
        color: "#666",
        marginBottom:"1.5rem"
    },
    button:{
        padding:"0.6rem 1.2rem",
        fontSize:"1rem",
        border:"none",
        borderRadius:"6px",
        background:"#007BFF",
        color:"#fff",
        cursor:"pointer"
    },

};

export default DailyQuote