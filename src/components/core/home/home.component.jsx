import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// Core Components
import Layout from '../layout/layout.component';
import Spinner from '../spinner/spinner.component';
import Search from '../search/search.component';
import Card from '../card/card.component';
import ScrollArrow from '../scroll-arrow/scroll-arrow.component';

// Actions
import { loadCompaniesByArrivals, loadCompaniesByMostPlacedStudents, loadCompaniesByOpenings, loadCompanies } from '../../../redux/company/company.actions';

const Home = (
    { company, 
    loadCompaniesByArrivals, 
    loadCompaniesByMostPlacedStudents, 
    loadCompaniesByOpenings,
    loadCompanies 
}) => {

    useEffect(() => {
        loadCompaniesByArrivals();
        loadCompaniesByMostPlacedStudents();
        loadCompaniesByOpenings();
        loadCompanies();
    }, []);

    const showError = (error) => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    return (
        <Layout title="Home" description="College Placement Forum" className="container-fluid">
            <div className="d-flex justify-content-around row m-2 text-center">
                <div className="border border-dark rounded m-3 p-4">
                    <h1 className="counter text-primary">{company.total_count}</h1>
                    <h3>Companies visited</h3>
                </div>
                <div className="border border-dark rounded m-3 p-4">
                    <h1 className="counter text-primary">43</h1>
                    <h3>Students placed</h3>
                </div>
                <div className="border border-dark rounded m-3 p-4">
                    <h1 className="counter text-primary">100%</h1>
                    <h3>Placement Gurantee</h3>
                </div>
            </div>
            <Search />
            {showError(company.error)}
            <h2 className="mb-4">Recent Joined Companies</h2>
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
            <ScrollArrow />
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    company: state.company
});

const mapDispatchToProps = (dispatch) => ({
    loadCompaniesByArrivals: () => dispatch( loadCompaniesByArrivals() ),
    loadCompanies: () => dispatch( loadCompanies() ),
    loadCompaniesByMostPlacedStudents: () => dispatch( loadCompaniesByMostPlacedStudents() ),
    loadCompaniesByOpenings: () => dispatch( loadCompaniesByOpenings() )
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);