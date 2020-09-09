import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

// Actions
import { addLike, removeLike, deletePost } from '../../../redux/post/post.actions';

const PostItem = (
    {   
        auth,
        post: { _id, text, likes, pic, postedBy, comments, createdAt },
        addLike,
        removeLike,
        deletePost,
        showActions
}) => {

    const handleLike = () => {
        addLike(_id, auth.user._id);
    };

    const handleUnLike = () => {
        removeLike(_id, auth.user._id);
    };

    const handleDeletePost = () => {
        deletePost(_id, auth.user._id);
    };

    return (
        <div className='post bg2-white p-1 my-1'>
            <div>
            <Link to="">
                <img className='round-img2' src={pic.cloudinary_url} alt='' />
                <h4>{postedBy.name}</h4>
            </Link>
            </div>

            <div>
            <p className='my-1'>{text}</p>
            <p className='post-date'>
                Posted { moment(createdAt).fromNow() } ( {moment(createdAt).format("dddd, MMMM Do YYYY, h:mm")} )
            </p>

            {(
                showActions && <>
                { likes.includes(auth.user._id) 
                    ? 
                        <button
                        onClick={handleUnLike}
                        type='button'
                        className='btn2 btn2-light'
                        >
                        <i className='fas fa-thumbs-down' />
                        </button>
                    :
                        <button
                        onClick={handleLike}
                        type='button'
                        className='btn2 btn2-light'
                        >
                        <i className='fas fa-thumbs-up' />{' '}   
                        </button>
                }
                <span className="m-3">{likes.length > 0 && <span>{likes.length}</span>}</span>
                <Link to={`/post/${_id}`} className='btn btn-primary mr-2'>
                    Discussion{' '}
                    {comments.length > 0 && (
                    <span className='comment-count bg-white'>{comments.length}</span>
                    )}
                </Link>
                {auth.success && postedBy._id === auth.user._id && (
                    <button
                    onClick={handleDeletePost}
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

PostItem.defaultProps = {
    showActions: true
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    addLike: (postId, studentId) => dispatch( addLike({ postId, studentId })),
    removeLike: (postId, studentId) => dispatch( removeLike({ postId, studentId })),
    deletePost: (postId, studentId) => dispatch( deletePost({ postId, studentId }))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);