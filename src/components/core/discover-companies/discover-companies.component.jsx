import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// Core Components
import Layout from '../layout/layout.component';
import Checkbox from '../checkbox/checkbox.component';
import Spinner from '../spinner/spinner.component';
import Card from '../card/card.component';

// Actions
import { loadFilteredCompanies, loadMoreCompanies } from '../../../redux/company/company.actions';
import { loadIndustries } from '../../../redux/industry/industry.actions';

const DiscoverCompanies = ({ loadFilteredCompanies, loadIndustries, loadMoreCompanies, company, industry }) => {

    const [myFilters, setMyFilters] = useState({
        filters: {
            industryName: []
        }
    });

    const [ values, setValues ] = useState({
        limit: 2,
        skip: 0,
        loading: false
    });

    const { limit ,skip, loading } = values;

    useEffect(() => {
        loadIndustries();  
        getFilteredCompanies(myFilters.filters);
    }, []);

    const getFilteredCompanies = (newFilters) => {
        setValues({
            ...values,
            loading: true
        });
        loadFilteredCompanies(newFilters, limit, skip);
        setValues({
            ...values,
            skip: 0,
            loading: false
        });
    };

    const getMoreCompanies = async () => {
        const skipData = await loadMoreCompanies(myFilters.filters, limit, skip);
        setValues({
            ...values,
            skip: skipData,
        });
    }

    const loadMoreButton = () => {
        return (
            company.count > 0 && company.filtered_count >= limit && (
                <button onClick={getMoreCompanies} className="btn btn-warning mb-5">
                    Load more
                </button>
            )
        );
    };

    const handleFilters = (filters, filterBy) => {
        const newFilters = {...myFilters};
        newFilters.filters[filterBy] = filters;
    
        getFilteredCompanies(myFilters.filters);
        setMyFilters(newFilters);
    };

    const showError = () => (
        <div className="alert alert-danger" style={{ display: company.error ? '' : 'none' }}>
            {company.error}
        </div>
    );

    const showLoading = (loading) => (
        loading && ( <Spinner/> )
    );

    const showEmptyResult = () => (
        <div className="alert alert-danger" style={{ display: company.count === 0 ? '' : 'none' }}>
            {`No companies found!`}
        </div>
    )

    return (
        <Layout title="Discover Page" description="Companies coming to our college" className="container-fluid">
            <div className="row">
                <div className="col-4">
                    <h4>Filter by industries</h4>
                    <ul>
                        <Checkbox industries={industry.industries} handleFilters={ filters => handleFilters(filters, 'industryName')}/>
                    </ul>
                </div>

                <div className="col-8">
                    <h2 className="mb-4">Companies</h2>
                    <div className="row">
                        {showError(company.error)}
                        {showLoading(loading)}
                        {showEmptyResult()}

                     { company.count > 0 && company.filtered_companies.map((company, index) => (
                            <div key={index} className="col-5 mb-3">
                                <Card company={company} showDetails={false}/>
                            </div> 
                     ))}

                    </div>
                    <hr/>
                    {loadMoreButton()}
                </div>
            </div>
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    company: state.company,
    industry: state.industry
});

const mapDispatchToProps = (dispatch) => ({
    loadFilteredCompanies: (filters, limit, skip) => dispatch( loadFilteredCompanies({ filters, limit, skip })),
    loadIndustries: () => dispatch( loadIndustries() ),
    loadMoreCompanies: (filters, limit, skip) => dispatch( loadMoreCompanies({ filters, limit, skip }))
});

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverCompanies);