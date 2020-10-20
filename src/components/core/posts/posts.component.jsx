import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// Core Components
import Layout from '../layout/layout.component';
import ScrollArrow from '../scroll-arrow/scroll-arrow.component';

// User Components
import PostItem from '../../user/post-item/post-item.component';
import PostForm from '../../user/post-form/post-form.component';

// Actions
import { loadPosts } from '../../../redux/post/post.actions';

const Posts = ({ post, loadPosts }) => {

    useEffect(() => {
        loadPosts();
    }, [loadPosts]);

    return (
        <Layout title="Posts" description="Find all posts by students" className="container-fluid">
            <div>
                <PostForm />
                <h4 className="text-dark">Posts:</h4>
                {   post.posts.length > 0 ?
                    post.posts.map((post) => (
                        <PostItem key={post._id} post={post} />
                    )) : 
                    <h5 className="text-danger">No posts posted yet!</h5>
                }
                <ScrollArrow />
            </div>
        </Layout>
    )
}

const mapStateToProps = (state) => ({
    post: state.post
});

const mapDispatchToProps = (dispatch) => ({
    loadPosts: () => dispatch( loadPosts() )
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
