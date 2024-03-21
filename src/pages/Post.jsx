import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { ColorRing } from 'react-loader-spinner';


export default function Post() {
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

   

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            })
            .finally(() => setLoading(false));
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

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

    return post ? (
        <div className="py-8">
            <Container>
                <div className="sm:w-1/2 w-2/3 flex m-auto justify-center mb-6 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl object-cover"
                    />

                    {isAuthor && (
                        <div className="absolute right-0 sm:right-6 sm:top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="sm:text-lg text-sm mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" className="sm:text-lg text-sm" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl text-slate-200 font-bold">{post.title}</h1>
                </div>
                <div className="browser-css text-slate-300">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}
