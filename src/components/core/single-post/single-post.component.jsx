import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// Core components
import Spinner from '../../core/spinner/spinner.component';
import Layout from '../../core/layout/layout.component';

// User components
import PostItem from '../../user/post-item/post-item.component';

// Actions
import { loadSinglePost } from '../../../redux/post/post.actions';

const Post = (props) => {
    
    useEffect(() => {
        const postId = props.match.params.postId;
        props.loadSinglePost(postId);
    }, []);

    console.log(props.post)
    return (
    <Layout 
            title={props.post.current_post_in_view && props.post.current_post_in_view.postedBy} 
            description={props.post.current_post_in_view && props.post.current_post_in_view.postedBy} 
            className="container-fluid"
        >
        {props.post.current_post_in_view  && props.company.current_post_in_view.postedBy &&
            <PostItem post={props.post.current_post_in_view} showActions={false}/> 
                
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