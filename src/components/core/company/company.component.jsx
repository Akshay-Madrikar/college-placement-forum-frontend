import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import parser from 'html-react-parser';

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

    const showError = (error) => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showQuestions = () => (
        <div className="card mt-4 mb-5">
                <h3 className="card-header">Question Bank</h3>
                <ul className="list-group">
                 <li className="list-group-item">
                     { props.company.current_company_in_view && props.company.current_company_in_view.description &&
                      props.company.current_company_in_view.questions.length > 0 
                      ?
                        props.company.current_company_in_view.questions.map((question, index) => (
                            <div key={index}>
                                <h6 className="text-dark">{parser(question.text)}</h6>
                                <h5 className="text-info">
                                    Submitted By: {question.submitted_by.name} - {question.submitted_by.email}
                                </h5>
                                <hr />
                            </div>
                        ))
                      : (
                        <h6 className="text-danger">No questions added yet</h6>
                      )
                     }
                     </li>
                </ul>
        </div>
    )

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
                {showQuestions()}
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