import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Button, Modal, Form } from 'react-bootstrap';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

// Set Axios default configuration for credentials
axios.defaults.withCredentials = true;

// Main component
const DoctorTable = ({ doctors }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  // Column definitions
  const columns = [
    { headerName: "Name", field: "name", filter: true },
    { headerName: "Phone No", field: "phone_no", filter: true },
    { headerName: "Location", field: "location", filter: true },
    { headerName: "Experience (years)", field: "experience", filter: true },
    { headerName: "Specialty", field: "speciality", filter: true },
    { headerName: "Email", field: "email", filter: true },
    {
      headerName: "Appointment",
      cellRenderer: (params) => (
        <div>
          <Button variant="primary bg-myblue" onClick={() => handleAppointmentClick(params.data.did)}>
            Book Appointment
          </Button>
        </div>
      ),
    },
  ];

  // Handle the button click in the Appointment column
  const handleAppointmentClick = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setModalVisible(true); // Show modal after button click
  };

  return (
    <div>
      <div className="ag-theme-alpine" style={{ width: '100%' }}>
        <AgGridReact
          rowData={doctors}
          columnDefs={columns}
          domLayout="autoHeight"
          pagination={true}
        />
      </div>

      {/* Appointment Modal */}
      <AppointmentModal
        show={modalVisible}
        onClose={() => setModalVisible(false)}
        doctorId={selectedDoctorId}
      />
    </div>
  );
};

// Appointment Modal component
const AppointmentModal = ({ show, onClose, doctorId }) => {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (show && doctorId) {
      // Simulate fetching slots data
      const dummySlots = [
        { slot_no: 1, time_range: '10:00 AM - 10:30 AM', availability: true },
        { slot_no: 2, time_range: '11:00 AM - 11:30 AM', availability: false },
        { slot_no: 3, time_range: '12:00 PM - 12:30 PM', availability: true },
      ];
      setSlots(dummySlots);
    }
  }, [show, doctorId]);

  const handleConfirmAppointment = () => {
    if (!selectedSlot || !description) {
      alert("Please select a slot and enter a description.");
      return;
    }

    // Simulate sending appointment data
    alert("Appointment booked successfully!");
    onClose(); // Close modal after successful booking
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Book an Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {doctorId ? (
          <>
            <p>Select an available slot for Doctor ID: {doctorId}</p>
            {Array.isArray(slots) && slots.length > 0 ? (
              <Form>
                {slots.map((slot) => (
                  <Form.Check 
                    key={slot.slot_no}
                    type="radio"
                    label={`${slot.time_range} - ${slot.availability ? 'Available' : 'Unavailable'}`}
                    name="slot"
                    value={slot.slot_no}
                    disabled={!slot.availability}
                    onChange={() => setSelectedSlot(slot.slot_no)}
                  />
                ))}
                <Form.Group className="mt-3">
                  <Form.Label>Description of Problem</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your symptoms or concerns"
                  />
                </Form.Group>
              </Form>
            ) : (
              <p>No available slots for this doctor.</p>
            )}
          </>
        ) : (
          <p>No doctor selected.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleConfirmAppointment} disabled={!selectedSlot || !description}>
          Confirm Appointment
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DoctorTable;
