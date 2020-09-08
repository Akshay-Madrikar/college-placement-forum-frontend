import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Core components
import Spinner from '../../core/spinner/spinner.component';
import Layout from '../../core/layout/layout.component';

// User components
import PostItem from '../../user/post-item/post-item.component';
import CommentForm from '../../user/comment-form/comment-form.component';

// Actions
import { loadSinglePost } from '../../../redux/post/post.actions';

const Post = (props) => {

    useEffect(() => {
        const postId = props.match.params.postId;
        props.loadSinglePost(postId);
    }, [loadSinglePost]);

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
                        </>
                    )
                }
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