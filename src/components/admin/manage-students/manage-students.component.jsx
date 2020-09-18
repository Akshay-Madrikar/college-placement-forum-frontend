import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Core Components
import Layout from '../../core/layout/layout.component';

// Actions
import { loadStudents, blockStudent, UnblockStudent } from '../../../redux/student/student.actions'; 

const ManageStudents = ({ auth, student, loadStudents, blockStudent, UnblockStudent  }) => {
    
    useEffect(() => {
        loadStudents();
    }, [loadStudents]);

    return (
        <Layout
            title="Manage Students"
            description="Perform actions on students"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-12 m-2">
                    <ul className="list-group">
                        { student.students.length > 0 ? student.students.map((student,index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                <strong>{student.name}</strong>
                                {
                                    student.block_status === 1 
                                    ?
                                    (<span 
                                        className="badge badge-success badge-pill" 
                                        onClick={() => UnblockStudent(student._id, auth.user._id)}
                                        style={{cursor: 'pointer'}}
                                        >
                                        Unblock
                                    </span>)
                                    : 
                                    (<span 
                                        className="badge badge-danger badge-pill" 
                                        onClick={() => blockStudent(student._id, auth.user._id)}
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