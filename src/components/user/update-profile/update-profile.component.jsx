import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Core Components
import Layout from '../../core/layout/layout.component';
import Spinner from '../../core/spinner/spinner.component';

// Utils
import { getImageUrl } from '../../../utils/cloudImage';

// Actions
import { updateProfile } from '../../../redux/student/student.actions'; 
 

const UpdateProfile = ({ match, auth, student, updateProfile }) => {

    const studentId = match.params.studentId;

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        image: '',
        loading: false,
        formData: {}
    });

    const [imageValues, setImageValues] = useState({
        url: undefined,
        cloudinary_id: undefined,
    })

    const [previewImage, setPreviewImage] = useState('');

    const {
        name,
        email,
        password,
        image,
        loading,
        formData
    } = values;

    const { url, cloudinary_id } = imageValues;

    useEffect(() => {
        if(url) {
            updateProfileDetails();
        }
    }, [url]);

    const updateProfileDetails = () => {
        setValues({
            ...values,
            loading: true
        });
        updateProfile(formData, imageValues, studentId);
        setValues({
            ...values,
            name: '',
            email: '',
            password: '',
            image: '',
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
            updateProfileDetails();
        } 
        setValues({...values, loading: false});
    };

    const newPostForm = () => (
        <form className="mb-3" >
            
            <h4>Profile Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input type="file" onChange={handleChange('image')}/>
                    {previewImage && (
                        <img src={previewImage} alt='chosen' style={{height: '250px', padding: '10px'}}/>
                    )}
                </label>
            </div>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input 
                    type="text" 
                    className="form-control" 
                    value={name} 
                    onChange={handleChange('name')}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <textarea 
                    type="text" 
                    className="form-control" 
                    value={email} 
                    onChange={handleChange('email')}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input 
                    type="number" 
                    className="form-control" 
                    value={password} 
                    onChange={handleChange('password')}
                />
            </div>

            <button className="btn btn-outline-primary" onClick={handleSubmit}>Update Profile</button>
        </form>
    );

    // const showSuccess = () => (
    //     <div className="alert alert-info" style={{ display: createdCompany.name ? '' : 'none' }}>
    //         <h2>{`${createdCompany.name}`} is created!</h2>
    //     </div>
    // );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: student.error ? '' : 'none' }}>
            {student.error}
        </div>
    );

    const showLoading = () => (
        loading && (
            <div className="alert alert-success">
                <Spinner />
            </div>
        )
    );

    const goBack = () => (
        <div className="mt-4 mb-2">
            <Link to="/user/dashboard" className="text-warning">
                Back to dashboard
            </Link>
        </div>
    )

    return (
        <Layout
            title="Update companies"
            description={`G'day ${auth.user.name}, ready to update your profile?`}
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showError()}
                    {/* {showSuccess()} */}
                    {newPostForm()}
                    {goBack()}
                </div>
            </div> 
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    student: state.student
});

const mapDispatchToProps = (dispatch) => ({
    updateProfile: (formData, imageData, studentId) => dispatch( updateProfile({ formData, imageData, studentId }))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);