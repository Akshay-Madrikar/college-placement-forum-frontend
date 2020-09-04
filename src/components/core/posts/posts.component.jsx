import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// Core Components
import Layout from '../layout/layout.component';
import Spinner from '../spinner/spinner.component';

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
                {post.posts.map((post) => (
                    <PostItem key={post._id} post={post} />
                ))}
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
