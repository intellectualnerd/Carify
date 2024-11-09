import React, { useState } from "react";
import Patientnav from "../Components/patientnav";
import "bootstrap/dist/css/bootstrap.min.css";

const ReportAnalysis = () => {
    const [file, setFile] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setError("");  // Clear any previous error message
    };

    const handleFileUpload = async () => {
        if (!file) {
            setError("Please upload a PDF file.");
            return;
        }

        setLoading(true);
        setError("");  // Reset any previous errors

        try {
            // Commenting out actual request
            // const formData = new FormData();
            // formData.append("report", file);

            // const response = await axios.post("/api/analyze-report", formData, {
            //     headers: { "Content-Type": "multipart/form-data" }
            // });
            // setAnalysisResult(response.data);

            // Dummy data for testing without backend
            const dummyData = {
                test_results: {
                    key_findings: ["High cholesterol", "Elevated blood pressure"],
                    abnormal_values: ["Cholesterol: 250 mg/dL", "Blood Pressure: 145/90 mmHg"],
                    normal_values: ["Blood Sugar: 90 mg/dL", "Heart Rate: 72 bpm"]
                },
                health_assessment: {
                    overall_status: "At Risk",
                    areas_of_concern: ["Cardiovascular health"],
                    positive_indicators: ["Normal blood sugar levels", "Regular heart rate"]
                },
                recommendations: {
                    immediate_actions: ["Consult a cardiologist"],
                    follow_up_tests: ["Lipid profile", "Blood pressure monitoring"],
                    lifestyle_changes: ["Reduce salt intake", "Increase physical activity"]
                },
                summary: "The report indicates elevated cholesterol and blood pressure, suggesting a need for immediate consultation and lifestyle changes."
            };

            setAnalysisResult(dummyData); // Using dummy data
        } catch (error) {
            console.error("Error uploading file:", error);
            setError("Failed to analyze the report. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Patientnav activeName="Report-analysis" />
            <div className="container mt-3">
                <h2 className="mb-3">Report Analysis</h2>

                {/* Error Alert */}
                {error && <div className="alert alert-danger" role="alert">{error}</div>}

                <div className="mb-3">
                    <input 
                        type="file" 
                        accept="application/pdf" 
                        onChange={handleFileChange} 
                        className="form-control"
                    />
                </div>
                <button 
                    onClick={handleFileUpload} 
                    disabled={loading} 
                    className="btn btn-primary"
                >
                    {loading ? "Analyzing..." : "Upload & Analyze"}
                </button>

                {analysisResult && (
                    <div className="analysis-result mt-4">
                        <h3>Analysis Result</h3>

                        <section className="mb-4 mydiv">
                            <h4 className="my-3">Test Results : </h4>
                            <p><strong>Key Findings:</strong> {analysisResult.test_results.key_findings.join(", ") || "None"}</p>
                            <p><strong>Abnormal Values:</strong> {analysisResult.test_results.abnormal_values.join(", ") || "None"}</p>
                            <p><strong>Normal Values:</strong> {analysisResult.test_results.normal_values.join(", ") || "None"}</p>
                        </section>

                        <section className="mb-4 mydiv">
                            <h4 className="my-3">Health Assessment</h4>
                            <p><strong>Overall Status:</strong> {analysisResult.health_assessment.overall_status || "Not available"}</p>
                            <p><strong>Areas of Concern:</strong> {analysisResult.health_assessment.areas_of_concern.join(", ") || "None"}</p>
                            <p><strong>Positive Indicators:</strong> {analysisResult.health_assessment.positive_indicators.join(", ") || "None"}</p>
                        </section>

                        <section className="mb-4 mydiv">
                            <h4 className="my-3">Recommendations</h4>
                            <p><strong>Immediate Actions:</strong> {analysisResult.recommendations.immediate_actions.join(", ") || "None"}</p>
                            <p><strong>Follow-up Tests:</strong> {analysisResult.recommendations.follow_up_tests.join(", ") || "None"}</p>
                            <p><strong>Lifestyle Changes:</strong> {analysisResult.recommendations.lifestyle_changes.join(", ") || "None"}</p>
                        </section>

                        <section className="mydiv mb-5">
                            <h4>Summary</h4>
                            <p>{analysisResult.summary || "Summary not available"}</p>
                        </section>
                    </div>
                )}
            </div>
        </>
    );
};

export default ReportAnalysis;
