import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// Core Components
import Layout from '../layout/layout.component';
import Spinner from '../spinner/spinner.component';
import Search from '../search/search.component';
import Card from '../card/card.component';

// Actions
import { loadCompaniesByArrivals, loadCompaniesByMostPlacedStudents, loadCompaniesByOpenings } from '../../../redux/company/company.actions';

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
        <Layout title="Home" description="College Placement Forum" className="container-fluid">
            <Search />
            {showError(company.error)}
            <h2 className="mb-4">Recent Added Companies</h2>
            <div className="row">
                { company.companies_by_arrival.length > 0 ? company.companies_by_arrival.map((company, index) => (
                        <div key={index} className="col-4 mb-3">
                            <Card company={company} showDetails={false}/>
                        </div> 
                    )) : <Spinner/>}
            </div>

            <h2 className="mb-4">Most Openings by Companies</h2>
            <div className="row">
                { company.companies_by_openings.length > 0 ? company.companies_by_openings.map((company, index) => (
                    <div key={index} className="col-4 mb-3">
                        <Card company={company} showDetails={false}/>
                    </div> 
                )) : <Spinner/>}
            </div>

            <h2 className="mb-4">Most students placed companies</h2>
            <div className="row">
                { company.companies_by_most_placed_students.length > 0 ? company.companies_by_most_placed_students.map((company, index) => (
                    <div key={index} className="col-4 mb-3">
                        <Card company={company} showDetails={false}/>
                    </div> 
                )) : <Spinner/>}
            </div>
            
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