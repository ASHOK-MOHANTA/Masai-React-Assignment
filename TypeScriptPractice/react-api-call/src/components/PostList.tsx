import React, { useEffect, useState } from 'react';
import { Post } from "../types/Post"; 


const PostList: React.FC =  () => {

    const [posts,setPosts] = useState<Post[]>([]);
    const [loading,setLoading] = useState<boolean>(true);
    const [error,setError] = useState<string | null>(null);

    const fetchPosts = async ()=>{
        try{
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            if(!response){
                throw new Error("Failed to fatch posts");
            }
            const data : Post[] = await response.json();
            setPosts(data);
        }catch(err){
            setError((err as Error).message);
        }finally{
            setLoading(false);
        }
    };
    useEffect(()=>{
        fetchPosts();
    },[]);
    if(loading) return <p>Loading Post...</p>;
    if ( error) return <p>Error: {error}</p>;
  return (
    <div>
      <h2>Post from JSONPlaceholder</h2>
      <ul>
        {posts.slice(0,10).map((post)=> (
            <li key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <hr/>
            </li>
        ))}
      </ul>
    </div>
  )
}

export default PostList;