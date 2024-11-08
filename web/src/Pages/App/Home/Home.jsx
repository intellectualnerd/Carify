// Home.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import doc_profile from './doctor.png';
import user_profile from './patient.png';
import Datatable from "../Components/Datatable";
import axios from 'axios';

const Home = () => {
    const [doctors, setDoctors] = useState([
        {
            did: 1,
            name: 'Dr. John Doe',
            phone_no: '1234567890',
            location: 'New York, NY',
            experience: 15,
            speciality: 'Cardiology',
            email: 'johndoe@example.com',
        },
        {
            did: 2,
            name: 'Dr. Jane Smith',
            phone_no: '0987654321',
            location: 'Los Angeles, CA',
            experience: 10,
            speciality: 'Pediatrics',
            email: 'janesmith@example.com',
        },
        {
            did: 3,
            name: 'Dr. Robert Brown',
            phone_no: '1122334455',
            location: 'Chicago, IL',
            experience: 8,
            speciality: 'Dermatology',
            email: 'robertbrown@example.com',
        },
        {
            did: 4,
            name: 'Dr. Emily White',
            phone_no: '2233445566',
            location: 'Miami, FL',
            experience: 12,
            speciality: 'Neurology',
            email: 'emilywhite@example.com',
        },
        {
            did: 5,
            name: 'Dr. William Harris',
            phone_no: '3344556677',
            location: 'Houston, TX',
            experience: 20,
            speciality: 'Orthopedics',
            email: 'williamharris@example.com',
        },
        {
            did: 6,
            name: 'Dr. Sarah Lewis',
            phone_no: '4455667788',
            location: 'Dallas, TX',
            experience: 5,
            speciality: 'Obstetrics and Gynecology',
            email: 'sarahlewis@example.com',
        },
        {
            did: 7,
            name: 'Dr. James Wilson',
            phone_no: '5566778899',
            location: 'Phoenix, AZ',
            experience: 18,
            speciality: 'Ophthalmology',
            email: 'jameswilson@example.com',
        },
        {
            did: 8,
            name: 'Dr. Olivia Martinez',
            phone_no: '6677889900',
            location: 'San Francisco, CA',
            experience: 14,
            speciality: 'Endocrinology',
            email: 'oliviamartinez@example.com',
        },
        {
            did: 9,
            name: 'Dr. David Clark',
            phone_no: '7788990011',
            location: 'Boston, MA',
            experience: 22,
            speciality: 'Gastroenterology',
            email: 'davidclark@example.com',
        },
        {
            did: 10,
            name: 'Dr. Linda Allen',
            phone_no: '8899001122',
            location: 'Seattle, WA',
            experience: 9,
            speciality: 'Rheumatology',
            email: 'lindaallen@example.com',
        },
    ]);

    const isDoctor = false;

    const fetchDoctorData = async () => {
        try {
            // Send a GET request to the backend with credentials included
            const response = await axios.get('http://localhost:8000/getInfo/', { withCredentials: true });
            console.log(response);
            
            // Uncomment below to set doctors with the response from backend once ready
            // setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching doctor data:', error);
            // Optionally set an error state or handle it as needed
        }
    };

    useEffect(() => {
        // Uncomment below to use real backend data instead of dummy data
        // fetchDoctorData();
    }, []);

    return (
        <>
            {isDoctor && (
                <nav className="navbar navbar-expand-sm navbar-dark bg-myblue">
                    <div className="container">
                        <a className="navbar-brand mytitle" href="javascript:void(0)">Carify</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="mynavbar">
                            <ul className="navbar-nav ms-auto d-flex align-items-center">
                                <li className="nav-item me-3">
                                    <a className="nav-link active" href="/">Home</a>
                                </li>
                                <li className="nav-item me-3">
                                    <a className="nav-link" href="/patient_info">Schedule</a>
                                </li>
                                <li className="nav-item me-3">
                                    <a className="nav-link" href="/patient_info">Patients</a>
                                </li>
                                <li className="nav-item me-3">
                                    <a className="nav-link" href="/patient_info">Dashboard</a>
                                </li>
                                <li className="nav-item d-flex align-items-center">
                                    <a className="nav-link" href="/profile">
                                        <img src={doc_profile} alt="Profile" height="40px" className="rounded-circle" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            )}
            {!isDoctor && (
                <>
                    <nav className="navbar navbar-expand-sm navbar-dark bg-myblue">
                        <div className="container">
                            <a className="navbar-brand mytitle" href="javascript:void(0)">Carify</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="mynavbar">
                                <ul className="navbar-nav ms-auto d-flex align-items-center">
                                    <li className="nav-item me-3">
                                        <a className="nav-link active" href="/">Appoint</a>
                                    </li>
                                    <li className="nav-item me-3">
                                        <a className="nav-link" href="/patient_info">Mental-test</a>
                                    </li>
                                    <li className="nav-item me-3">
                                        <a className="nav-link" href="/patient_info">Chatbot</a>
                                    </li>
                                    <li className="nav-item me-3">
                                        <a className="nav-link" href="/patient_info">Report-analysis</a>
                                    </li>
                                    <li className="nav-item d-flex align-items-center">
                                        <a className="nav-link" href="/profile">
                                            <img src={user_profile} alt="Profile" height="40px" className="rounded-circle" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <div className='container'>
                        <p className='mt-4 mytitle' style={{ color: "black" }}>Doctors:</p>
                        <Datatable doctors={doctors} />
                    </div>
                </>
            )}
        </>
    );
};

export default Home;
