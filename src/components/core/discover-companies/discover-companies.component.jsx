import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// Core Components
import Layout from '../layout/layout.component';
import Checkbox from '../checkbox/checkbox.component';
//import Card from './Card.component';

// Actions
import { loadFilteredCompanies } from '../../../redux/company/company.actions';
import { loadIndustries } from '../../../redux/industry/industry.actions';

const DiscoverCompanies = ({ loadFilteredCompanies, loadIndustries, company, industry }) => {

    const [myFilters, setMyFilters] = useState({
        filters: {
            category: []
        }
    });

    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);

    useEffect(() => {
        getIndustry();

    }, []);

    const getIndustry = () => {
        loadIndustries();  
        getFilteredComapnies(myFilters.filters);
    };

    const getFilteredComapnies = (newFilters) => {
        loadFilteredCompanies(newFilters, limit, skip);
        setSkip(0);
    }


    // const loadMore = async () => {
    //     try {
    //         let toSkip = skip + limit;

    //         const data = {
    //             limit,
    //             skip: toSkip,
    //             filters: myFilters.filters
    //         }
    //         const products = await fetch(`${API}/products/by/search`, {
    //             method: "POST",
    //             headers: {
    //                 Accept: 'application/json',
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(data)
    //         });
    //         const productsJSON = await products.json();
    //         if(productsJSON.error) {
    //             setError(productsJSON.error)
    //         } else {
    //             setFilteredResults([...filteredResults, ...productsJSON.productsBySearch]);
    //             setSize(productsJSON.size);
    //             setSkip(toSkip);
    //         };  
    //     } catch(error) {
    //         console.log(error);
    //     } 
    // };

    // const loadMoreButton = () => {
    //     return (
    //         size > 0 && size >= limit && (
    //             <button onClick={loadMore} className="btn btn-warning mb-5">
    //                 Load more
    //             </button>
    //         )
    //     );
    // };

    const handleFilters = (filters, filterBy) => {
        const newFilters = {...myFilters};
        newFilters.filters[filterBy] = filters;
        getFilteredComapnies(myFilters.filters);
        setMyFilters(newFilters);
    };

    const showError = () => (
        <div className="alert alert-danger" style={{ display: company.error ? '' : 'none' }}>
            {company.error}
        </div>
    );

    return (
        <Layout title="Discover Page" description="Companies coming to our college" className="container-fluid">
            <div className="row">
                <div className="col-4">
                    <h4>Filter by industries</h4>
                    <ul>
                        <Checkbox industries={industry.industries} handleFilters={ filters => handleFilters(filters, 'category')}/>
                    </ul>
                </div>

                <div className="col-8">
                    <h2 className="mb-4">Companies</h2>
                    <div className="row">
                        {showError(company.error)}
                     {(JSON.stringify(company.filtered_companies))}

                     {/* { filteredResults.map((product, index) => (
                            <div key={index} className="col-4 mb-3">
                                <Card product={product} showDetails={false}/>
                            </div> 
                     ))} */}
                    </div>
                    <hr/>
                    {/* {loadMoreButton()} */}
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
    loadFilteredCompanies: (filters, limit, skip) => dispatch( loadFilteredCompanies({ filters, limit, skip })),
    loadIndustries: () => dispatch( loadIndustries() )
});

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverCompanies);