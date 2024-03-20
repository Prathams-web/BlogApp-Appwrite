import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import { ColorRing } from 'react-loader-spinner';

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
        .finally(() => setLoading(false));
    }, [])

    
    if(loading) return (
        <span className='flex justify-center'>
            <ColorRing
              visible={true}
              height="150"
              width="150"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={['#f5f5f5', '#dcdcdc', '#a9a9a9', '#cfe2f3', '#5fa2dd']}
            />
          </span>
    )
  
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex justify-center sm:justify-start flex-wrap '>
                    {posts.map((post) => (
                        <div key={post.$id} className='flex justify-evenly p-2 sm:w-1/2 md:w-1/3 lg:w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home