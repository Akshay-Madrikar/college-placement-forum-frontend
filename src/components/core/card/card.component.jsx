import React, { useState }  from 'react';
import {Link, Redirect} from 'react-router-dom';
import moment from 'moment';
import ShowImage from './image.component';

const Card = ({ 
        company, 
        showDetails = true, 
        showViewProductButton = true
    }) => {

    const [redirect, setRedirect] = useState(false); 

    const showViewButton = (showViewProductButton) => {
        return (
            showViewProductButton && (
                <Link to={`/company/${company._id}`}>
                    <button className="btn btn-outline-primary mt-2 mb-2 mr-2 text-center">
                        View Company
                    </button>
                </Link>
            )
        );
    };

    const showRedirect = (redirect) => {
        if(redirect) {
            return <Redirect to="/discover"/>
        }
    };

    const showProductDetails = (showDetails) => {
        return ( showDetails && (
            <>
            <p className="lead mt-2">
                {company.description}
            </p>
            <p className="black-9">
                Industry: {company.industryName.name && company.industryName.name}
            </p>
            <p className="black-8">
                Added on {moment(company.createdAt).fromNow()}
            </p>
            {showOpenings(company.openings)}
            <br/>
            {showPlaced(company.count_of_placed_students)}
            <br/>
            </>
        ))
    }


    const showOpenings = (openings) => {
        return openings > 0 ? (
        <span className="badge badge-primary badge-pill">Openings Avaiable: {openings}</span>
        ) : (
            <span className="badge badge-primary badge-pill">No openings</span>
        )
    };

    const showPlaced = (count) => {
        return count > 0 ? (
        <span className="badge badge-primary badge-pill">No.of students placed: {count}</span>
        ) : (
            <span className="badge badge-primary badge-pill">Be the first to get placed</span>
        )
    };

    return (
            <div className="card">
                <div className="card-header name">{company.name}</div>
                <div className="card-body">
                    {showRedirect(redirect)}
                    <ShowImage id={company.pic.cloudinary_id}/>

                    {showProductDetails(showDetails)}

                    {showViewButton(showViewProductButton)}

                </div>
            </div>
    );
};

export default Card;