import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Core Components
import Layout from '../../core/layout/layout.component';
import Spinner from '../../core/spinner/spinner.component';

// Utils
import { getImageUrl } from '../../../utils/cloudImage';

// Actions
import { updateCompany, loadSingleCompany } from '../../../redux/company/company.actions'; 
import { loadIndustries } from '../../../redux/industry/industry.actions'; 
 

const UpdateCompany = ({ match, auth, company, industry, updateCompany, loadIndustries, loadSingleCompany }) => {

    const companyId = match.params.companyId;

    const [values, setValues] = useState({
        name: '',
        description: '',
        industryName: '',
        openings: '',
        image: '',
        count_of_placed_students: '',
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
        description,
        industryName,
        openings,
        image,
        count_of_placed_students,
        loading,
        formData
    } = values;

    const { url, cloudinary_id } = imageValues;

    useEffect(() => {
        init();
    }, []);

    useEffect(() => {
        if(url) {
            updateCompanyDetails();
        }
    }, [url]);

    const init = () => {
        loadIndustries();
    }

    const updateCompanyDetails = () => {
        setValues({
            ...values,
            loading: true
        });
        updateCompany(formData, imageValues, auth.user._id, companyId);
        setValues({
            ...values,
            name: '',
            description: '',
            industryName: '',
            image: '',
            openings: '',
            count_of_placed_students: '',
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
            updateCompanyDetails();
        } 
        setValues({...values, loading: false});
    };

    const newPostForm = () => (
        <form className="mb-3" >
            
            <h4>Company Photo</h4>
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
                    { industry.industries && industry.industries.map((ind, index) => (
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

            <button className="btn btn-outline-primary" onClick={handleSubmit}>Update Company</button>
        </form>
    );

    // const showSuccess = () => (
    //     <div className="alert alert-info" style={{ display: createdCompany.name ? '' : 'none' }}>
    //         <h2>{`${createdCompany.name}`} is created!</h2>
    //     </div>
    // );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: company.error ? '' : 'none' }}>
            {company.error}
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
            <Link to="/admin/dashboard" className="text-warning">
                Back to dashboard
            </Link>
        </div>
    )

    return (
        <Layout
            title="Update companies"
            description={`G'day ${auth.user.name}, ready to update company?`}
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
    company: state.company,
    industry: state.industry
});

const mapDispatchToProps = (dispatch) => ({
    updateCompany: (formData, imageData, id, companyId) => dispatch( updateCompany({ formData, imageData, id, companyId })),
    loadIndustries: () => dispatch( loadIndustries() ),
    loadSingleCompany: (companyId) => dispatch( loadSingleCompany({ companyId }))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCompany);