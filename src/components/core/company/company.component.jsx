import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// Core Components
import Layout from '../../core/layout/layout.component';
import Spinner from '../../core/spinner/spinner.component';
import Card from '../card/card.component';

// Actions
import { loadSingleCompany } from '../../../redux/company/company.actions'; 

const Company = (props) => {

    useEffect(() => {
        const companyId = props.match.params.companyId;
        props.loadSingleCompany(companyId);
    }, []);

    console.log(props.company)
    const showError = (error) => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    return (
        <Layout 
            title={props.company.current_company_in_view && props.company.current_company_in_view.name} 
            description={props.company.current_company_in_view && props.company.current_company_in_view.description} 
            className="container-fluid"
        >
            <div className="row" style={{margin: '20px'}}>
                <div className="col-8">
                {showError(props.company.error)}
                {
                   props.company.current_company_in_view && props.company.current_company_in_view.description &&
                   <Card company={props.company.current_company_in_view} showViewProductButton={false}/>
                }
                </div>
            </div>
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    company: state.company
});

const mapDispatchToProps = (dispatch) => ({
    loadSingleCompany: (companyId) => dispatch( loadSingleCompany({ companyId }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Company);