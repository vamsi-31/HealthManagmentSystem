import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { appointments, doctors } from '../utils/dummyData';
import '../styles/PatientDashboard.css';
import { FaCalendarAlt, FaUserMd, FaUserCircle, FaSearch, FaPlus, FaTimes, FaRegClock } from 'react-icons/fa';

const PatientDashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('appointments');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('upcoming');
  const [patientAppointments, setPatientAppointments] = useState(
    appointments.filter(app => app.patientId === 'p1')
  );
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    date: '',
    time: '',
    reason: ''
  });
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || 'John Smith',
    email: 'john.smith@example.com',
    contactNumber: '555-123-4567',
    age: '45',
    gender: 'Male',
    address: '123 Main St, Anytown, USA'
  });

  // Filter appointments based on search term
  const filteredAppointments = patientAppointments.filter(appointment => 
    appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
        return appDate >= today && (appointment.status === 'confirmed' || appointment.status === 'requested');
      });
    } else if (viewMode === 'past') {
      return filteredAppointments.filter(appointment => {
        const appDate = new Date(appointment.date);
        return appDate < today || appointment.status === 'completed' || appointment.status === 'cancelled';
      });
    }
    return filteredAppointments;
  };

  const displayedAppointments = getFilteredAppointmentsByDate();

  // Filter doctors based on search term
  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCancelAppointment = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      setPatientAppointments(patientAppointments.map(appointment => 
        appointment.id === id ? {...appointment, status: 'cancelled'} : appointment
      ));
      showNotification('Appointment cancelled successfully', 'success');
    }
  };

  const handleBookAgain = (appointment) => {
    setSelectedDoctor(doctors.find(doctor => doctor.name === appointment.doctorName));
    setBookingForm({
      date: '',
      time: '',
      reason: appointment.notes || ''
    });
    setShowModal(true);
  };

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setBookingForm({
      date: '',
      time: '',
      reason: ''
    });
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setBookingForm({
      ...bookingForm,
      [name]: value
    });
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    showNotification('Profile updated successfully', 'success');
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    
    // Create new appointment
    const newAppointment = {
      id: `app${Date.now()}`,
      patientId: 'p1',
      patientName: profileData.name,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      date: bookingForm.date,
      time: bookingForm.time,
      status: 'requested',
      notes: bookingForm.reason
    };
    
    setPatientAppointments([...patientAppointments, newAppointment]);
    setShowModal(false);
    showNotification('Appointment request submitted successfully', 'success');
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

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
    <div className="patient-dashboard">
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      
      <div className="dashboard-header">
        <div className="header-left">
          <h2>Patient Dashboard</h2>
          <div className="patient-info">
            <h3>{profileData.name}</h3>
            <p>Patient ID: P1001 | Age: {profileData.age}</p>
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
            <h3>Upcoming Appointments</h3>
            <p className="stat-number">{patientAppointments.filter(a => a.status === 'confirmed').length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon completed-icon">
            <FaRegClock />
          </div>
          <div className="stat-info">
            <h3>Completed Visits</h3>
            <p className="stat-number completed-number">{patientAppointments.filter(a => a.status === 'completed').length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon pending-icon">
            <FaCalendarAlt />
          </div>
          <div className="stat-info">
            <h3>Pending Requests</h3>
            <p className="stat-number pending-number">{patientAppointments.filter(a => a.status === 'requested').length}</p>
          </div>
        </div>
      </div>
      
      <div className="dashboard-tabs">
        <button 
          className={`tab ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          <FaCalendarAlt /> My Appointments
        </button>
        <button 
          className={`tab ${activeTab === 'doctors' ? 'active' : ''}`}
          onClick={() => setActiveTab('doctors')}
        >
          <FaUserMd /> Find Doctors
        </button>
        <button 
          className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <FaUserCircle /> My Profile
        </button>
      </div>
      
      <div className="dashboard-content">
        {activeTab === 'appointments' && (
          <div className="appointments-section">
            <div className="section-header">
              <h3>My Appointments</h3>
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
                    <th>Doctor</th>
                    <th>Specialty</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Notes</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedAppointments.length > 0 ? (
                    displayedAppointments.map(appointment => (
                      <tr key={appointment.id}>
                        <td>{appointment.doctorName}</td>
                        <td>{doctors.find(d => d.name === appointment.doctorName)?.specialty || 'General'}</td>
                        <td>{appointment.date}</td>
                        <td>{appointment.time}</td>
                        <td>
                          <span className={`status ${appointment.status}`}>
                            {appointment.status}
                          </span>
                        </td>
                        <td>{appointment.notes || '-'}</td>
                        <td>
                          {(appointment.status === 'requested' || appointment.status === 'confirmed') ? (
                            <button 
                              className="action-btn cancel"
                              onClick={() => handleCancelAppointment(appointment.id)}
                            >
                              <FaTimes /> Cancel
                            </button>
                          ) : (
                            <button 
                              className="action-btn book"
                              onClick={() => handleBookAgain(appointment)}
                            >
                              <FaPlus /> Book Again
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="no-data">No appointments found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'doctors' && (
          <div className="doctors-section">
            <div className="section-header">
              <h3>Available Doctors</h3>
            </div>
            <div className="doctors-grid">
              {filteredDoctors.map(doctor => (
                <div className="doctor-card" key={doctor.id}>
                  <div className="doctor-avatar">
                    <span>{doctor.name.charAt(0)}</span>
                  </div>
                  <h4>{doctor.name}</h4>
                  <p className="specialty">{doctor.specialty}</p>
                  <p className="experience">{doctor.experience} years experience</p>
                  <div className="doctor-details">
                    <p><strong>Availability:</strong> Mon-Fri</p>
                    <p><strong>Rating:</strong> ★★★★☆</p>
                  </div>
                  <button 
                    className="book-btn"
                    onClick={() => handleBookAppointment(doctor)}
                  >
                    Book Appointment
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'profile' && (
          <div className="profile-section">
            <div className="section-header">
              <h3>My Profile</h3>
            </div>
            <div className="profile-container">
              <div className="profile-avatar">
                <FaUserCircle />
                <button className="change-photo-btn">Change Photo</button>
              </div>
              <form className="profile-form" onSubmit={handleSaveProfile}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Contact Number</label>
                    <input 
                      type="tel" 
                      name="contactNumber"
                      value={profileData.contactNumber}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Age</label>
                    <input 
                      type="number" 
                      name="age"
                      value={profileData.age}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Gender</label>
                    <select 
                      name="gender"
                      value={profileData.gender}
                      onChange={handleProfileChange}
                      required
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Blood Group</label>
                    <select 
                                            name="bloodGroup"
                                            value={profileData.bloodGroup || 'A+'}
                                            onChange={handleProfileChange}
                                          >
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                          </select>
                                        </div>
                                      </div>
                                      <div className="form-group">
                                        <label>Address</label>
                                        <textarea 
                                          name="address"
                                          value={profileData.address}
                                          onChange={handleProfileChange}
                                          required
                                        ></textarea>
                                      </div>
                                      <div className="form-group">
                                        <label>Medical History</label>
                                        <textarea 
                                          name="medicalHistory"
                                          value={profileData.medicalHistory || ''}
                                          onChange={handleProfileChange}
                                          placeholder="List any chronic conditions, allergies, or previous surgeries..."
                                        ></textarea>
                                      </div>
                                      <div className="form-actions">
                                        <button type="submit" className="save-btn">Save Changes</button>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              )}
                            </div>
                      
                            {showModal && (
                              <div className="modal-overlay">
                                <div className="modal">
                                  <h3>Book Appointment</h3>
                                  <div className="doctor-info">
                                    <div className="doctor-avatar modal-avatar">
                                      <span>{selectedDoctor.name.charAt(0)}</span>
                                    </div>
                                    <div>
                                      <h4>{selectedDoctor.name}</h4>
                                      <p className="specialty">{selectedDoctor.specialty}</p>
                                      <p className="experience">{selectedDoctor.experience} years experience</p>
                                    </div>
                                  </div>
                                  <form onSubmit={handleBookingSubmit}>
                                    <div className="form-group">
                                      <label>Preferred Date</label>
                                      <input 
                                        type="date" 
                                        name="date"
                                        value={bookingForm.date}
                                        onChange={handleFormChange}
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label>Preferred Time</label>
                                      <select 
                                        name="time"
                                        value={bookingForm.time}
                                        onChange={handleFormChange}
                                        required
                                      >
                                        <option value="">Select a time</option>
                                        <option value="09:00 AM">09:00 AM</option>
                                        <option value="10:00 AM">10:00 AM</option>
                                        <option value="11:00 AM">11:00 AM</option>
                                        <option value="12:00 PM">12:00 PM</option>
                                        <option value="02:00 PM">02:00 PM</option>
                                        <option value="03:00 PM">03:00 PM</option>
                                        <option value="04:00 PM">04:00 PM</option>
                                        <option value="05:00 PM">05:00 PM</option>
                                      </select>
                                    </div>
                                    <div className="form-group">
                                      <label>Reason for Visit</label>
                                      <textarea 
                                        name="reason"
                                        value={bookingForm.reason}
                                        onChange={handleFormChange}
                                        placeholder="Please describe your symptoms or reason for consultation..."
                                        required
                                      ></textarea>
                                    </div>
                                    <div className="modal-actions">
                                      <button type="submit" className="save-btn">
                                        Request Appointment
                                      </button>
                                      <button 
                                        type="button" 
                                        className="cancel-btn"
                                        onClick={() => setShowModal(false)}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      };
                      
                      export default PatientDashboard;