import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

// Actions
import { deleteComment } from '../../../redux/post/post.actions';

const CommentItem = (
    {   
        auth,
        authorId,
        comment: { _id, text, postedBy, date },
        postId,
        deleteComment
}) => {

    const handleDeleteComment = () => {
        deleteComment(postId, auth.user._id, _id);
    };

    return (
        <div className='post bg2-white p-1 my-1'>
            <div>
            {/* Complete student information below*/}
            <Link to="">
                <img className='round-img2' src={postedBy.pic.cloudinary_url} alt='' />
                <h4>{postedBy.name}</h4>
            </Link>
            </div>

            <div>
            { postedBy.role === 1 && <span className="badge badge-info badge-pill">admin</span> }
            {auth.success && authorId === postedBy._id && 
                <span className="badge badge-info badge-pill">author</span>
            }
            <p className='my-1'>{text}</p>
            <p className='post-date'>
            Posted { moment(date).fromNow() } ( {moment(date).format("dddd, MMMM Do YYYY, h:mm")} )
            </p>
            {auth.success && postedBy._id === auth.user._id && (
                <button
                onClick={handleDeleteComment}
                type='button'
                className='btn btn-danger'
                >
                <i className='fas fa-times' />
                </button>
            )}
            </div>
      </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
   deleteComment: (postId, studentId, commentId) => dispatch( deleteComment({ postId, studentId, commentId }))
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);