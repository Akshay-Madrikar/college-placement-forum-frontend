import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Core components
import ScrollArrow from '../scroll-arrow/scroll-arrow.component';
import Layout from '../../core/layout/layout.component';

// User components
import PostItem from '../../user/post-item/post-item.component';
import CommentForm from '../../user/comment-form/comment-form.component';
import CommentItem from '../../user/comment-item/comment-item.component';

// Actions
import { loadSinglePost } from '../../../redux/post/post.actions';

const Post = (props) => {

    useEffect(() => {
        const postId = props.match.params.postId;
        props.loadSinglePost(postId);
    }, [props.loadSinglePost]);

    console.log(props.post.current_post_in_view)
    return (
        <Layout 
        title="Discussion of the post"
        description= {props.post.current_post_in_view.postedBy && "Posted by " + props.post.current_post_in_view.postedBy.name}
        className="container-fluid"
        >
            <Link to="/posts" className="btn btn-outline-primary mb-2">
                Back To Posts
            </Link>
                {
                    props.post.current_post_in_view && props.post.current_post_in_view.text && (
                        <>
                        <PostItem post={props.post.current_post_in_view} showActions={false}/>
                        <CommentForm postId={props.post.current_post_in_view._id}/>
                        <div className="comments">
                            <h4 className="text-dark">Comments:</h4>
                            {
                               props.post.current_post_in_view.comments.length > 0 ? props.post.current_post_in_view.comments.map( comment => (
                                    <CommentItem 
                                        key={comment._id} 
                                        comment={comment}
                                        authorId={props.post.current_post_in_view.postedBy._id} 
                                        postId={props.post.current_post_in_view._id}
                                    />
                                )) : <h5 className="text-danger">No comments posted yet!</h5>
                            }
                        </div>
                        </>
                    )
                }
                <ScrollArrow />
        </Layout>
    )
};

const mapStateToProps = (state) => ({
    post: state.post
});

const mapDispatchToProps = (dispatch) => ({
    loadSinglePost: (postId) => dispatch( loadSinglePost({ postId }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Post);