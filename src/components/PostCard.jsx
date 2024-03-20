import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
    // console.log(String(appwriteService.getFilePreview(featuredImage)));
  return (
    <Link to={`/post/${$id}`}>
        <div className='shadow-xl transition-all hover:scale-105 shadow-cyan-500/40 w-full bg-white rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-sm lg:text-xl md:text-lg sm:text-sm font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard