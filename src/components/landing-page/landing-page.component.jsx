import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div>
            <section className="landing">
                <div className="dark-overlay">
                    <div className="landing-inner">
                    <h1 className="x-large">College Placement Forum</h1>
                    <p className="lead">
                        Get all news regarding placements in one platform
                    </p>
                    <div className="buttons">
                        <Link to="/signup" className="btn btn-primary">Sign Up</Link>
                        <Link to="/signin" className="btn btn-light">Login</Link>
                    </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default LandingPage;
