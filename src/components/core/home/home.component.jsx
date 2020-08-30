import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// Core Components
import Layout from '../layout/layout.component';
import Spinner from '../spinner/spinner.component';
//import Card from './Card.component';

// Actions
import { loadCompaniesByArrivals, loadCompaniesByMostPlacedStudents, loadCompaniesByOpenings } from '../../../redux/company/company.actions';


// import Card from './Card.component';
// import Search from './Search.component';

const Home = (
    { company, 
    loadCompaniesByArrivals, 
    loadCompaniesByMostPlacedStudents, 
    loadCompaniesByOpenings 
}) => {

    useEffect(() => {
        loadCompaniesByArrivals();
        loadCompaniesByMostPlacedStudents();
        loadCompaniesByOpenings();
    }, []);

    const showError = (error) => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    return (
        <Layout title="Home" description="MERN stack project" className="container-fluid">

            {showError(company.error)}
            <h2 className="mb-4">New Companies Coming</h2>
            <div className="row">
                { JSON.stringify(company.companies_by_arrival) }
            </div>

            <h2 className="mb-4">Most Openings by Companies</h2>
            <div className="row">
                { JSON.stringify(company.companies_by_openings) }
            </div>

            <h2 className="mb-4">Most students placed companies</h2>
            <div className="row">
                { JSON.stringify(company.companies_by_most_placed_students) }
            </div>

            {/* <h2 className="mb-4">Best Sellers</h2>
            <div className="row">
                { productsBySell.map((product, index) => (
                    <div key={index} className="col-4 mb-3">
                        <Card product={product} showDetails={false}/>
                    </div> 
                )) }
            </div> */}
            
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    company: state.company
});

const mapDispatchToProps = (dispatch) => ({
    loadCompaniesByArrivals: () => dispatch( loadCompaniesByArrivals() ),
    loadCompaniesByMostPlacedStudents: () => dispatch( loadCompaniesByMostPlacedStudents() ),
    loadCompaniesByOpenings: () => dispatch( loadCompaniesByOpenings() )
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);