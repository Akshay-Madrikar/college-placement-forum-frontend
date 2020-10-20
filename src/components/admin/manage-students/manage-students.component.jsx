import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// Core Components
import Layout from '../../core/layout/layout.component';
import ScrollArrow from '../../core/scroll-arrow/scroll-arrow.component';

// Actions
import { loadStudents, blockStudent, UnblockStudent } from '../../../redux/student/student.actions'; 

const ManageStudents = ({ auth, student, loadStudents, blockStudent, UnblockStudent  }) => {
    
    const [values, setValues] = useState({
        blockSuccess: false,
        unBlockSuccess: false
    });

    const { blockSuccess, unBlockSuccess } = values;

    useEffect(() => {
        loadStudents();
    }, [loadStudents]);

    const showBlockSuccess = (blockSuccess) => (
        <div className="alert alert-danger" style={{ display: blockSuccess ? '' : 'none' }}>
            <h2>Block successfull!</h2>
        </div>
    );

    const showUnBlockSuccess = (UnBlockSuccess) => (
        <div className="alert alert-info" style={{ display: UnBlockSuccess ? '' : 'none' }}>
            <h2>Student has been unblocked!</h2>
        </div>
    );

    return (
        <Layout
            title="Manage Users"
            description="Perform actions on users"
            className="container-fluid"
        >
            { showBlockSuccess(blockSuccess) }
            { showUnBlockSuccess(unBlockSuccess) }
            <div className="row">
                <div className="col-12 m-2">
                    <ul className="list-group">
                        { student.students.length > 0 ? student.students.map((student,index) => (
                            <li key={index} className="list-group-item d-flex align-items-center">
                                <strong className="mr-auto p-2">{student.name}</strong>
                                { student.role === 1 && <span className="badge badge-info badge-pill m-2 p-3">admin</span> }
                                {
                                    student.block_status === 1 
                                    ?
                                    (<span 
                                        className="badge badge-success badge-pill m-2 p-3" 
                                        onClick={() => {
                                            UnblockStudent(student._id, auth.user._id);
                                            setValues({ ...values, unBlockSuccess: true });
                                        }}
                                        style={{cursor: 'pointer'}}
                                        >
                                        Unblock
                                    </span>)
                                    : 
                                    (<span 
                                        className="badge badge-danger badge-pill m-2 p-3" 
                                        onClick={() => {
                                            blockStudent(student._id, auth.user._id);
                                            setValues({ ...values, blockSuccess: true });
                                        }}
                                        style={{cursor: 'pointer'}}
                                        >
                                        Block
                                    </span>)
                                }
                                
                            </li>
                        )) : <h5 className="text-danger">No students found!!!</h5>}
                    </ul>
                </div>
            </div>
            <ScrollArrow />
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    student: state.student
});

const mapDispatchToProps = (dispatch) => ({
    loadStudents: () => dispatch( loadStudents() ),
    blockStudent: (studentId, adminId) => dispatch( blockStudent({ studentId, adminId })),
    UnblockStudent: (studentId, adminId) => dispatch( UnblockStudent({ studentId, adminId }))
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageStudents);