import React, { useState } from 'react';
import { connect } from 'react-redux';

// Actions
import { addComment } from '../../../redux/post/post.actions'; 
 

const CommentForm = ({ auth, post, addComment, postId }) => {

    const [values, setValues] = useState({
        body: '',
        createdComment: '',
        formData: {}
    });

    const {
        body,
        formData
    } = values;

    const handleChange = (name) => (event) => {
        const value = event.target.value;
        formData[name] = value;
        setValues({...values, [name]: value});
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        addComment(formData, postId, auth.user._id);
        setValues({ ...values, body: '' })
    };

    const newCommentForm = () => (  
        <form className="mb-3" >
            <div className="form-group">
                <label className="text-muted">Say Something...</label>
                <textarea 
                    type="text" 
                    cols="30"
                    rows="5"
                    placeholder="Add comment"
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

    return (
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showError(post.error)}
                    {/* {showSuccess(post.createdPost.postedBy.name)} */}
                    {newCommentForm()}
                </div>
            </div> 
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    post: state.post
});

const mapDispatchToProps = (dispatch) => ({
    addComment: (formData, postId, studentId) => dispatch( addComment({ formData, postId, studentId }))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);