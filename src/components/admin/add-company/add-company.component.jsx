import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Core Components
import Layout from '../../core/layout/layout.component';


// Actions
import { createCompany } from '../../../redux/company/company.actions'; 
import { loadIndustries } from '../../../redux/industry/industry.actions'; 
import { getImageUrl } from '../../../redux/cloud-image/cloud-image.actions'; 

const AddCompany = ({ auth, company,industry, createCompany, loadIndustries, getImageUrl }) => {

    const [values, setValues] = useState({
        name: '',
        description: '',
        industries: [],
        industryName: '',
        openings: '',
        image: '',
        url: undefined,
        cloudinary_id: undefined,
        count_of_placed_students: '',
        loading: false,
        error: '',
        createdCompany: '',
        redirectToProfile: false,
        formData: ''
    });

    const [previewImage, setPreviewImage] = useState('');

    const {
        name,
        description,
        industries,
        industryName,
        openings,
        image,
        url,
        cloudinary_id,
        count_of_placed_students,
        loading,
        error,
        createdCompany,
        redirectToProfile,
        formData
    } = values;

    useEffect(() => {
        getIndustry();
    }, []);

    useEffect(() => {
        if(url) {
            addCompany();
        }
    }, [url])

    const addCompany = () => {
        createCompany(formData, auth.user._id);
        setValues({
            ...values,
            name: '',
            description: '',
            image: '',
            openings: '',
            count_of_placed_students: '',
            createdCompany: company.company,
            loading: false
        })
    }

    const getIndustry = () => {
        loadIndustries();
        setValues({
            ...values, 
            industries: industry.industries, 
            formData: new FormData()
        });   
    }

    const handleChange = (name) => (event) => {
        const value = event.target.value;
        formData.set(name, value)
        setValues({...values, [name]: value});
    };

    const handleImage = (event) => {
        const value = event.target.files[0];
        setValues({
            ...values,
            image: value
        })
        previewFile(value)
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewImage(reader.result)
        }
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: '', loading: true});
        if(image) {
            getImageUrl();
        } else {
            addCompany();
        } 
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={handleSubmit}>
            <h4>Company Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input type="file" onChange={handleImage}/>
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
                <label className="text-muted">Description</label>
                <textarea 
                    type="text" 
                    className="form-control" 
                    value={description} 
                    onChange={handleChange('description')}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Industry</label>
                <select 
                    type="text" 
                    className="form-control" 
                    value={industryName} 
                    onChange={handleChange('industryName')}
                >
                    <option>Select industry</option>
                    { industries && industries.map((ind, index) => (
                        <option key={index} value={ind._id}>{ind.name}</option>
                    )) }
                    
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Openings</label>
                <input 
                    type="number" 
                    className="form-control" 
                    value={openings} 
                    onChange={handleChange('openings')}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Count of placed students</label>
                <input 
                    type="number" 
                    className="form-control" 
                    value={count_of_placed_students} 
                    onChange={handleChange('count_of_placed_students')}
                />
            </div>

            <button className="btn btn-outline-primary">Add Company</button>
        </form>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdCompany ? '' : 'none' }}>
            <h2>{`${name}`} is created!</h2>
        </div>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showLoading = () => (
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        )
    );

    const goBack = () => (
        <div className="mt-4 mb-2">
            <Link to="/admin/dashboard" className="text-warning">
                Back to dashboard
            </Link>
        </div>
    )

    return (
        <Layout
            title="Add a new company"
            description={`G'day ${auth.user.name}, ready to add a new company`}
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showError()}
                    {showSuccess()}
                    {newPostForm()}
                    {goBack()}
                </div>
            </div> 
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    company: state.company,
    industry: state.industry,
    cloudImage: state.cloudImage
});

const mapDispatchToProps = (dispatch) => ({
    createCompany: (formData, id) => dispatch( createCompany({ formData, id })),
    loadIndustries: () => dispatch( loadIndustries() ),
    getImageUrl: (data) => dispatch( createCompany({ data }))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCompany);