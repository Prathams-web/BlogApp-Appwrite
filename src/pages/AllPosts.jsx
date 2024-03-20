import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/config'
import { ColorRing } from 'react-loader-spinner';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
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

  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex justify-center sm:justify-start flex-wrap '>
                {posts.map((post) => (
                    <div key={post.$id} className='flex justify-evenly p-2 sm:w-1/2 md:w-1/3 lg:w-1/4' >
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts