import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Actions
import { addLike, removeLike, deletePost } from '../../../redux/post/post.actions';

const PostItem = (
    {   
        auth,
        post: { _id, body, likes, pic, postedBy, comments }
}) => {
    console.log(body)
    return (
        <div className='post bg2-white p-1 my-1'>
            <div>
            <Link >
                <img className='round-img2' src={pic.cloudinary_url} alt='' />
                <h4>{postedBy.name}</h4>
            </Link>
            </div>

            <div>
            <p className='my-1'>{body}</p>
            <p className='post-date'>
                Posted on dasdas
            </p>

            {(
                <>
                <button
                    
                    type='button'
                    className='btn2 btn2-light'
                >
                    <i className='fas fa-thumbs-up' />{' '}
                    <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
                </button>
                <button
                    
                    type='button'
                    className='btn2 btn2-light'
                >
                    <i className='fas fa-thumbs-down' />
                </button>
                <Link to={`/posts/${_id}`} className='btn btn-primary mr-2'>
                    Discussion{' '}
                    {comments.length > 0 && (
                    <span className='comment-count'>{comments.length}</span>
                    )}
                </Link>
                {auth.success && postedBy._id === auth.user._id && (
                    <button
                    
                    type='button'
                    className='btn btn-danger'
                    >
                    <i className='fas fa-times' />
                    </button>
                )}
                </>
            )}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PostItem);