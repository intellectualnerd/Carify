import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Patientnav from "../Components/patientnav";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import Cookies from 'js-cookie';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PatientProfile = () => {
    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(null); // Initialize as null for loading state
    const [patient, setPatient] = useState({
        pid: "P12345",
        name: "John Doe",
        phone_no: "1234567890",
        location: "New York, USA",
        age: 45,
        gender: "Male",
        email: "johndoe@example.com",
    });

    const [reports, setReports] = useState([
        { pid: "P12345", did: "D001", link: "/reports/report1.pdf" },
        { pid: "P12345", did: "D002", link: "/reports/report2.pdf" },
        { pid: "P12345", did: "D003", link: "/reports/report3.pdf" },
        { pid: "P12345", did: "D004", link: "/reports/report4.pdf" },
        { pid: "P12345", did: "D005", link: "/reports/report5.pdf" },
        { pid: "P12345", did: "D006", link: "/reports/report6.pdf" },
    ]);

    const [medicalHistory, setMedicalHistory] = useState([
        { did: "D001", pid: "P12345", sid: "S001", date: "2024-09-15", status: "Appointed" },
        { did: "D002", pid: "P12345", sid: "S002", date: "2024-09-10", status: "Canceled" },
        { did: "D003", pid: "P12345", sid: "S003", date: "2024-08-20", status: "Rejected" },
        { did: "D004", pid: "P12345", sid: "S004", date: "2024-08-15", status: "Appointed" },
    ]);

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState(null);

    // This will run once when the component mounts to check cookies
    useEffect(() => {
        const checkCookies = () => {
            const cookies = document.cookie.split('; ');
            const email = cookies.find(cookie => cookie.startsWith('email='));
            const role = cookies.find(cookie => cookie.startsWith('role='));
            const password = cookies.find(cookie => cookie.startsWith('password='));

            if (email && role && password) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                navigate('/'); // Redirect to home if not authenticated
            }
        };

        checkCookies();
    }, [navigate]); // Empty dependencies array ensures it only runs once

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // Optional: You can show a loading indicator while checking cookies
    }

    if (!isAuthenticated) {
        return null; // You can render a different component or message here
    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = () => {
        if (!selectedFile) {
            setUploadStatus("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        // Uncomment this when backend endpoint is ready for file uploads
        /*
        axios.post("https://api.example.com/upload-report", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then(response => {
            setReports([...reports, { pid: patient.pid, did: response.data.did, link: response.data.link }]);
            setUploadStatus("File uploaded successfully.");
        })
        .catch(error => {
            setUploadStatus("Error uploading the file.");
            console.error("File upload error:", error);
        });
        */
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "Appointed":
                return "badge bg-success";
            case "Canceled":
                return "badge bg-warning text-dark";
            case "Rejected":
                return "badge bg-danger";
            default:
                return "badge bg-secondary";
        }
    };

    const months = ["Sep", "Oct", "Nov", "Dec"];
    const scores = [20, 8, 10, 2];

    const data = {
        labels: months,
        datasets: [
            {
                label: "Monthly Scores",
                data: scores,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.dataset.label}: ${context.raw}`;
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Months",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Scores",
                },
                min: 0,
                max: 27,
            },
        },
    };

    const handleLogout = () => {
        Cookies.remove("email");
        Cookies.remove("password");
        Cookies.remove("role");
        navigate("/login");
    };

    return (
        <>
            <Patientnav activeName="Profile" />
            <div className="container mt-4">
                <h2 className="mb-4">Patient Profile</h2>

                <button className="btn btn-danger mb-4" onClick={handleLogout}>
                    Logout
                </button>

                <div className="card mb-4">
                    <div className="card-body">
                        <h4 className="card-title">Patient Information</h4>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>Patient ID:</strong> {patient.pid}</li>
                            <li className="list-group-item"><strong>Name:</strong> {patient.name}</li>
                            <li className="list-group-item"><strong>Phone Number:</strong> {patient.phone_no}</li>
                            <li className="list-group-item"><strong>Location:</strong> {patient.location}</li>
                            <li className="list-group-item"><strong>Age:</strong> {patient.age}</li>
                            <li className="list-group-item"><strong>Gender:</strong> {patient.gender}</li>
                            <li className="list-group-item"><strong>Email:</strong> {patient.email}</li>
                        </ul>
                    </div>
                </div>

                <div className="card mb-4">
                    <div className="card-body">
                        <h4 className="card-title">Upload Medical Report</h4>
                        <div className="mb-3">
                            <input
                                type="file"
                                className="form-control"
                                accept=".pdf"
                                onChange={handleFileChange}
                            />
                        </div>
                        <button className="btn btn-primary" onClick={handleFileUpload}>
                            Upload Report
                        </button>
                        {uploadStatus && (
                            <div className={`alert ${uploadStatus.includes('Error') ? 'alert-danger' : 'alert-success'} mt-3`} role="alert">
                                {uploadStatus}
                            </div>
                        )}
                    </div>
                </div>

                <div className="card mb-4">
                    <div className="card-body">
                        <h4 className="card-title">Patient Reports</h4>
                        <ul className="list-group list-group-flush">
                            {reports.map((report, index) => (
                                <li className="list-group-item" key={index}>
                                    <a href={report.link} target="_blank" rel="noopener noreferrer">
                                        Report {index + 1}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="card mb-4">
                    <div className="card-body">
                        <h4 className="card-title">Medical History</h4>
                        <ul className="list-group list-group-flush">
                            {medicalHistory.map((history, index) => (
                                <li className="list-group-item" key={index}>
                                    <strong>Doctor ID:</strong> {history.did} - <strong>Status:</strong>{" "}
                                    <span className={getStatusClass(history.status)}>{history.status}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="card mb-4">
                    <div className="card-body">
                        <h4 className="card-title">Monthly Scores</h4>
                        <Line data={data} options={options} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default PatientProfile;
