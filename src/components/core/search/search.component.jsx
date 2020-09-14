import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// Core component
import Card from '../card/card.component';

// Actions
import { loadSearchCompanies } from '../../../redux/company/company.actions'; 
import { loadIndustries } from '../../../redux/industry/industry.actions'; 

const Search = ({ company, industry, loadSearchCompanies, loadIndustries }) => {

    const [data, setData] = useState({
        industryName: '',
        search: '',
        searched: false
    });

    const { industryName, search, searched } = data;

    useEffect(() => {
        loadIndustries();
    }, []);

    const searchData = () => {
        if(search) {
            loadSearchCompanies({search: search || undefined, industryName: industryName});
        }
        setData({
            ...data,
            searched: true
        })
    };

    const searchSubmit = (event) => {
        event.preventDefault();
        searchData();
    };

    const handleChange = (name) => (event) => {
        setData({...data, [name]: event.target.value, searched:false})
    };

    const searchMessage = (searched, results) => {
        if(searched && results.length > 0) {
            return `Found ${results.length} companies`
        }

        if(searched && results.length < 1) {
            return `No companies found`
        }
    };

    const searchedCompanies = () => {
        return(
            <div>
                <h2 className="mt-4 mb-4">
                    {searchMessage(searched, company.searched_companies)}
                </h2>

                <div className="row m-2" >
                    { company.searched_companies && company.searched_companies.length > 0 && company.searched_companies.map((company, index) => (
                        <Card key={index} company={company} showDetails={false}/>
                    )) }
                </div>
            </div>
            
        );
    };

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select className="btn mr-2" onChange={handleChange('industryName')}>
                            <option value="All">Select industry</option>
                            { industry.industries.map((industry, index) => (
                                <option key={index} value={industry._id}>
                                    {industry.name}
                                </option>
                            )) 
                            }
                        </select>
                    </div>

                    <input 
                        type="search"
                        className="form-control"
                        onChange={handleChange('search')}
                        placeholder="Search by name"
                    />
                </div>

                <div className="btn input-group-append" style={{border: 'none'}}>
                    <button className="input-group-text">Search</button>
                </div>
            </span>
        </form>
    );

    return (
        <div className="row mb-3">
           <div className="container">
               {searchForm()}
           </div>
           <div className="container-fluid mb-3">
               {searchedCompanies(company.searched_companies)}
           </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    company: state.company,
    industry: state.industry
});

const mapDispatchToProps = (dispatch) => ({
    loadSearchCompanies: (params) => dispatch( loadSearchCompanies({ params })),
    loadIndustries: () => dispatch( loadIndustries() )
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);