import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Core Components
import Layout from '../../core/layout/layout.component';
import Spinner from '../../core/spinner/spinner.component';

// Utils
import { getImageUrl } from '../../../utils/cloudImage';

// Actions
import { createPost } from '../../../redux/post/post.actions'; 
 

const PostForm = ({ auth, post, createPost }) => {

    const [values, setValues] = useState({
        body: '',
        image: '',
        loading: false,
        createdPost: '',
        formData: {}
    });

    const [imageValues, setImageValues] = useState({
        url: undefined,
        cloudinary_id: undefined,
    })

    const [previewImage, setPreviewImage] = useState('');

    const {
        body,
        image,
        loading,
        createdPost,
        formData
    } = values;

    const { url, cloudinary_id } = imageValues;

    useEffect(() => {
        if(url) {
            addPost();
        }
    }, [url])

    const addPost = () => {
        setValues({
            ...values,
            loading: true
        });
        createPost(formData, imageValues, auth.user._id);
        setValues({
            ...values,
            name: '',
            image: '',
            createdPost: post.recent_added_post,
            loading: false
        })
    }

    const handleChange = (name) => (event) => {
        const value = name === 'image' ? event.target.files[0] : event.target.value;
        formData[name] = value;
        setValues({...values, [name]: value});
        if(name === 'image') {
            previewFile(value)
        }
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewImage(reader.result)
        };
    };

    const loadImageUrl = async() => {
        const imageData = new FormData();
        imageData.append('image', image);
        const result = await getImageUrl(imageData);
        setImageValues({
            url: result.secure_url,
            cloudinary_id: result.public_id
        });
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({...values, loading: true});
        if(image) {
            loadImageUrl();
        } else {
            addPost();
        } 
        setValues({...values, loading: false});
    };

    const newPostForm = () => (  
        <form className="mb-3" >
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input type="file" onChange={handleChange('image')}/>
                    {previewImage && (
                        <img src={previewImage} alt='chosen' style={{height: '150px', width: '150px', padding: '10px'}}/>
                    )}
                </label>
            </div>

            <div className="form-group">
                <label className="text-muted">Say Something...</label>
                <textarea 
                    type="text" 
                    cols="30"
                    rows="5"
                    placeholder="Create a post"
                    className="form-control" 
                    value={body} 
                    onChange={handleChange('body')}
                    required
                />
            </div>

            <button className="btn btn-outline-primary" onClick={handleSubmit}>Submit</button>
        </form>
    );

    const showSuccess = (name) => (
        <div className="alert alert-info" style={{ display: name ? '' : 'none' }}>
            <h2>{`${name}`} is created!</h2>
        </div>
    );

    const showError = (error) => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showLoading = () => (
        loading && (
            <div className="alert alert-success">
                <Spinner />
            </div>
        )
    );

    return (
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showError(post.error )}
                    {/* {showSuccess(post.createdPost.postedBy.name)} */}
                    {newPostForm()}
                </div>
            </div> 
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    post: state.post
});

const mapDispatchToProps = (dispatch) => ({
    createPost: (formData, imageData, id) => dispatch( createPost({ formData, imageData, id }))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);