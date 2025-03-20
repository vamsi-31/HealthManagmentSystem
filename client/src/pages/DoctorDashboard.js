import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { appointments, patients } from '../utils/dummyData';
import '../styles/DoctorDashboard.css';
import { FaCalendarAlt, FaUserInjured, FaSearch, FaNotesMedical, FaFileMedical } from 'react-icons/fa';

const DoctorDashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('appointments');
  const [searchTerm, setSearchTerm] = useState('');
  const [doctorAppointments, setDoctorAppointments] = useState([...appointments]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [notes, setNotes] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [viewMode, setViewMode] = useState('upcoming'); // upcoming, past, all
  
  // Get unique patient IDs from this doctor's appointments
  const patientIds = [...new Set(doctorAppointments.map(app => app.patientId))];
  
  // Filter patients who have appointments with this doctor
  const doctorPatients = patients.filter(patient => patientIds.includes(patient.id));

  // Filter appointments based on search term
  const filteredAppointments = doctorAppointments.filter(appointment => 
    appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.notes?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter appointments based on view mode
  const getFilteredAppointmentsByDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (viewMode === 'upcoming') {
      return filteredAppointments.filter(appointment => {
        const appDate = new Date(appointment.date);
        return appDate >= today;
      });
    } else if (viewMode === 'past') {
      return filteredAppointments.filter(appointment => {
        const appDate = new Date(appointment.date);
        return appDate < today;
      });
    }
    return filteredAppointments;
  };

  const displayedAppointments = getFilteredAppointmentsByDate();

  // Filter patients based on search term
  const filteredPatients = doctorPatients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (id, newStatus) => {
    setDoctorAppointments(doctorAppointments.map(appointment => 
      appointment.id === id ? {...appointment, status: newStatus} : appointment
    ));
    showNotification(`Appointment status updated to ${newStatus}`, 'success');
  };

  const handleViewNotes = (appointment) => {
    setSelectedAppointment(appointment);
    setNotes(appointment.notes || '');
    setShowModal(true);
  };

  const handleSaveNotes = () => {
    setDoctorAppointments(doctorAppointments.map(appointment => 
      appointment.id === selectedAppointment.id ? {...appointment, notes: notes} : appointment
    ));
    setShowModal(false);
    showNotification('Notes saved successfully', 'success');
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  // Count statistics
  const todayAppointments = doctorAppointments.filter(app => {
    const today = new Date().toISOString().split('T')[0];
    return app.date === today;
  }).length;

  const pendingRequests = doctorAppointments.filter(app => 
    app.status === 'requested'
  ).length;

  useEffect(() => {
    // Add animation class to notification
    if (notification.show) {
      const notifElement = document.querySelector('.notification');
      notifElement.classList.add('show');
      
      setTimeout(() => {
        notifElement.classList.remove('show');
      }, 2800);
    }
  }, [notification.show]);

  return (
    <div className="doctor-dashboard">
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      
      <div className="dashboard-header">
        <div className="header-left">
          <h2>Doctor Dashboard</h2>
          <div className="doctor-info">
            <h3>{currentUser?.name || 'Dr. Elizabeth Green'}</h3>
            <p>Cardiology | 15 years experience</p>
          </div>
        </div>
        <div className="header-right">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <FaCalendarAlt />
          </div>
          <div className="stat-info">
            <h3>Today's Appointments</h3>
            <p className="stat-number">{todayAppointments}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaUserInjured />
          </div>
          <div className="stat-info">
            <h3>Total Patients</h3>
            <p className="stat-number">{doctorPatients.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaNotesMedical />
          </div>
          <div className="stat-info">
            <h3>Pending Requests</h3>
            <p className="stat-number">{pendingRequests}</p>
          </div>
        </div>
      </div>
      
      <div className="dashboard-tabs">
        <button 
          className={`tab ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          <FaCalendarAlt /> Appointments
        </button>
        <button 
          className={`tab ${activeTab === 'patients' ? 'active' : ''}`}
          onClick={() => setActiveTab('patients')}
        >
          <FaUserInjured /> My Patients
        </button>
      </div>
      
      <div className="dashboard-content">
        {activeTab === 'appointments' && (
          <div className="appointments-section">
            <div className="section-header">
              <h3>Appointments</h3>
              <div className="view-filters">
                <button 
                  className={`filter-btn ${viewMode === 'upcoming' ? 'active' : ''}`}
                  onClick={() => setViewMode('upcoming')}
                >
                  Upcoming
                </button>
                <button 
                  className={`filter-btn ${viewMode === 'past' ? 'active' : ''}`}
                  onClick={() => setViewMode('past')}
                >
                  Past
                </button>
                <button 
                  className={`filter-btn ${viewMode === 'all' ? 'active' : ''}`}
                  onClick={() => setViewMode('all')}
                >
                  All
                </button>
              </div>
            </div>
            
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedAppointments.length > 0 ? (
                    displayedAppointments.map(appointment => (
                      <tr key={appointment.id}>
                        <td>{appointment.patientName}</td>
                        <td>{appointment.date}</td>
                        <td>{appointment.time}</td>
                        <td>
                          <span className={`status ${appointment.status}`}>
                            {appointment.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              className="action-btn notes"
                              onClick={() => handleViewNotes(appointment)}
                              title="View/Add Notes"
                            >
                              <FaFileMedical />
                            </button>
                            <select 
                              className={`status-select ${appointment.status}`}
                              value={appointment.status}
                              onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                            >
                              <option value="requested">Requested</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="no-data">No appointments found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'patients' && (
          <div className="patients-section">
            <div className="section-header">
              <h3>My Patients</h3>
            </div>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Last Visit</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map(patient => (
                      <tr key={patient.id}>
                        <td>{patient.name}</td>
                        <td>{patient.email}</td>
                        <td>{patient.contactNumber}</td>
                        <td>{patient.age}</td>
                        <td>{patient.gender}</td>
                        <td>
                          {new Date().toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                        <td>
                          <button className="view-history-btn">
                            View History
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="no-data">No patients found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Patient Notes</h3>
            <div className="patient-info">
              <p><strong>Patient:</strong> {selectedAppointment.patientName}</p>
              <p><strong>Date:</strong> {selectedAppointment.date}</p>
              <p><strong>Time:</strong> {selectedAppointment.time}</p>
            </div>
            <div className="form-group">
              <label>Notes</label>
              <textarea 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter medical notes, observations, or follow-up instructions..."
              />
            </div>
            <div className="modal-actions">
              <button className="save-btn" onClick={handleSaveNotes}>
                Save Notes
              </button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;