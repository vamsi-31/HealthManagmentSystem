import React, { useState, useEffect } from 'react';
import { patients, doctors, appointments } from '../utils/dummyData';
import '../styles/AdminDashboard.css';
import { FaSearch, FaUserEdit, FaTrash, FaCheck, FaTimes, FaPlus } from 'react-icons/fa';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('patients');
  const [searchTerm, setSearchTerm] = useState('');
  const [patientsData, setPatientsData] = useState([...patients]);
  const [doctorsData, setDoctorsData] = useState([...doctors]);
  const [appointmentsData, setAppointmentsData] = useState([...appointments]);
  const [editingItem, setEditingItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [formData, setFormData] = useState({});
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const filteredPatients = patientsData.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDoctors = doctorsData.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAppointments = appointmentsData.filter(appointment => 
    appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (item, type) => {
    setEditingItem(item);
    setModalType(type);
    setFormData({...item});
    setShowModal(true);
  };

  const handleDelete = (id, type) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (type === 'patient') {
        setPatientsData(patientsData.filter(patient => patient.id !== id));
        showNotification('Patient deleted successfully', 'success');
      } else if (type === 'doctor') {
        setDoctorsData(doctorsData.filter(doctor => doctor.id !== id));
        showNotification('Doctor deleted successfully', 'success');
      } else if (type === 'appointment') {
        setAppointmentsData(appointmentsData.filter(appointment => appointment.id !== id));
        showNotification('Appointment deleted successfully', 'success');
      }
    }
  };

  const handleAdd = (type) => {
    setModalType(type);
    setEditingItem(null);
    
    // Set default form data based on type
    if (type === 'patient') {
      setFormData({
        id: Date.now(),
        name: '',
        email: '',
        contactNumber: '',
        age: '',
        gender: '',
        address: ''
      });
    } else if (type === 'doctor') {
      setFormData({
        id: Date.now(),
        name: '',
        email: '',
        contactNumber: '',
        specialty: '',
        experience: ''
      });
    } else if (type === 'appointment') {
      setFormData({
        id: Date.now(),
        patientName: '',
        doctorName: '',
        date: '',
        time: '',
        status: 'requested',
        notes: ''
      });
    }
    
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (modalType === 'patient') {
      if (editingItem) {
        setPatientsData(patientsData.map(patient => 
          patient.id === editingItem.id ? formData : patient
        ));
        showNotification('Patient updated successfully', 'success');
      } else {
        setPatientsData([...patientsData, formData]);
        showNotification('Patient added successfully', 'success');
      }
    } else if (modalType === 'doctor') {
      if (editingItem) {
        setDoctorsData(doctorsData.map(doctor => 
          doctor.id === editingItem.id ? formData : doctor
        ));
        showNotification('Doctor updated successfully', 'success');
      } else {
        setDoctorsData([...doctorsData, formData]);
        showNotification('Doctor added successfully', 'success');
      }
    } else if (modalType === 'appointment') {
      if (editingItem) {
        setAppointmentsData(appointmentsData.map(appointment => 
          appointment.id === editingItem.id ? formData : appointment
        ));
        showNotification('Appointment updated successfully', 'success');
      } else {
        setAppointmentsData([...appointmentsData, formData]);
        showNotification('Appointment added successfully', 'success');
      }
    }
    
    setShowModal(false);
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const handleStatusChange = (id, newStatus) => {
    setAppointmentsData(appointmentsData.map(appointment => 
      appointment.id === id ? {...appointment, status: newStatus} : appointment
    ));
    showNotification(`Appointment status changed to ${newStatus}`, 'success');
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
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      
      <div className="dashboard-controls">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'patients' ? 'active' : ''}`}
            onClick={() => setActiveTab('patients')}
          >
            Patients
          </button>
          <button 
            className={`tab ${activeTab === 'doctors' ? 'active' : ''}`}
            onClick={() => setActiveTab('doctors')}
          >
            Doctors
          </button>
          <button 
            className={`tab ${activeTab === 'appointments' ? 'active' : ''}`}
            onClick={() => setActiveTab('appointments')}
          >
            Appointments
          </button>
        </div>
        
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
      
      <div className="dashboard-content">
        {activeTab === 'patients' && (
          <div className="patients-section">
            <div className="section-header">
              <h3>Patients List</h3>
              <button className="add-btn" onClick={() => handleAdd('patient')}>
                <FaPlus /> Add Patient
              </button>
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
                    <th>Address</th>
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
                        <td>{patient.address}</td>
                        <td>
                          <button 
                            className="action-btn edit"
                            onClick={() => handleEdit(patient, 'patient')}
                          >
                            <FaUserEdit />
                          </button>
                          <button 
                            className="action-btn delete"
                            onClick={() => handleDelete(patient.id, 'patient')}
                          >
                            <FaTrash />
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
        
        {activeTab === 'doctors' && (
          <div className="doctors-section">
            <div className="section-header">
              <h3>Doctors List</h3>
              <button className="add-btn" onClick={() => handleAdd('doctor')}>
                <FaPlus /> Add Doctor
              </button>
            </div>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Specialty</th>
                    <th>Experience</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDoctors.length > 0 ? (
                    filteredDoctors.map(doctor => (
                      <tr key={doctor.id}>
                        <td>{doctor.name}</td>
                        <td>{doctor.email}</td>
                        <td>{doctor.contactNumber}</td>
                        <td>{doctor.specialty}</td>
                        <td>{doctor.experience} years</td>
                        <td>
                          <button 
                            className="action-btn edit"
                            onClick={() => handleEdit(doctor, 'doctor')}
                          >
                            <FaUserEdit />
                          </button>
                          <button 
                            className="action-btn delete"
                            onClick={() => handleDelete(doctor.id, 'doctor')}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="no-data">No doctors found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'appointments' && (
          <div className="appointments-section">
            <div className="section-header">
              <h3>Appointments List</h3>
              <button className="add-btn" onClick={() => handleAdd('appointment')}>
                <FaPlus /> Add Appointment
              </button>
            </div>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Notes</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.length > 0 ? (
                    filteredAppointments.map(appointment => (
                      <tr key={appointment.id}>
                        <td>{appointment.patientName}</td>
                        <td>{appointment.doctorName}</td>
                        <td>{appointment.date}</td>
                        <td>{appointment.time}</td>
                        <td>
                          <span className={`status ${appointment.status}`}>
                            {appointment.status}
                          </span>
                        </td>
                        <td>{appointment.notes}</td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              className="action-btn edit"
                              onClick={() => handleEdit(appointment, 'appointment')}
                            >
                              <FaUserEdit />
                            </button>
                            <button 
                              className="action-btn delete"
                              onClick={() => handleDelete(appointment.id, 'appointment')}
                            >
                              <FaTrash />
                            </button>
                            {appointment.status === 'requested' && (
                              <>
                                <button 
                                  className="action-btn confirm"
                                  onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                                  title="Confirm"
                                >
                                  <FaCheck />
                                </button>
                                <button 
                                  className="action-btn cancel"
                                  onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                                  title="Cancel"
                                >
                                  <FaTimes />
                                </button>
                              </>
                            )}
                            {appointment.status === 'confirmed' && (
                              <button 
                                className="action-btn complete"
                                onClick={() => handleStatusChange(appointment.id, 'completed')}
                                title="Mark as Completed"
                              >
                                <FaCheck />
                              </button>
                            )}
                          </div>
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
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingItem ? `Edit ${modalType}` : `Add New ${modalType}`}</h3>
            <form onSubmit={handleFormSubmit}>
              {modalType === 'patient' && (
                <>
                  <div className="form-group">
                    <label>Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name || ''} 
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input 
                                            type="email" 
                                            name="email" 
                                            value={formData.email || ''} 
                                            onChange={handleFormChange}
                                            required
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label>Contact Number</label>
                                          <input 
                                            type="text" 
                                            name="contactNumber" 
                                            value={formData.contactNumber || ''} 
                                            onChange={handleFormChange}
                                            required
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label>Age</label>
                                          <input 
                                            type="number" 
                                            name="age" 
                                            value={formData.age || ''} 
                                            onChange={handleFormChange}
                                            required
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label>Gender</label>
                                          <select 
                                            name="gender" 
                                            value={formData.gender || ''} 
                                            onChange={handleFormChange}
                                            required
                                          >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                          </select>
                                        </div>
                                        <div className="form-group">
                                          <label>Address</label>
                                          <textarea 
                                            name="address" 
                                            value={formData.address || ''} 
                                            onChange={handleFormChange}
                                            required
                                          />
                                        </div>
                                      </>
                                    )}
                                    
                                    {modalType === 'doctor' && (
                                      <>
                                        <div className="form-group">
                                          <label>Name</label>
                                          <input 
                                            type="text" 
                                            name="name" 
                                            value={formData.name || ''} 
                                            onChange={handleFormChange}
                                            required
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label>Email</label>
                                          <input 
                                            type="email" 
                                            name="email" 
                                            value={formData.email || ''} 
                                            onChange={handleFormChange}
                                            required
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label>Contact Number</label>
                                          <input 
                                            type="text" 
                                            name="contactNumber" 
                                            value={formData.contactNumber || ''} 
                                            onChange={handleFormChange}
                                            required
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label>Specialty</label>
                                          <input 
                                            type="text" 
                                            name="specialty" 
                                            value={formData.specialty || ''} 
                                            onChange={handleFormChange}
                                            required
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label>Experience (years)</label>
                                          <input 
                                            type="number" 
                                            name="experience" 
                                            value={formData.experience || ''} 
                                            onChange={handleFormChange}
                                            required
                                          />
                                        </div>
                                      </>
                                    )}
                                    
                                    {modalType === 'appointment' && (
                                      <>
                                        <div className="form-group">
                                          <label>Patient Name</label>
                                          <select 
                                            name="patientName" 
                                            value={formData.patientName || ''} 
                                            onChange={handleFormChange}
                                            required
                                          >
                                            <option value="">Select Patient</option>
                                            {patientsData.map(patient => (
                                              <option key={patient.id} value={patient.name}>
                                                {patient.name}
                                              </option>
                                            ))}
                                          </select>
                                        </div>
                                        <div className="form-group">
                                          <label>Doctor Name</label>
                                          <select 
                                            name="doctorName" 
                                            value={formData.doctorName || ''} 
                                            onChange={handleFormChange}
                                            required
                                          >
                                            <option value="">Select Doctor</option>
                                            {doctorsData.map(doctor => (
                                              <option key={doctor.id} value={doctor.name}>
                                                {doctor.name} - {doctor.specialty}
                                              </option>
                                            ))}
                                          </select>
                                        </div>
                                        <div className="form-group">
                                          <label>Date</label>
                                          <input 
                                            type="date" 
                                            name="date" 
                                            value={formData.date || ''} 
                                            onChange={handleFormChange}
                                            required
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label>Time</label>
                                          <input 
                                            type="time" 
                                            name="time" 
                                            value={formData.time || ''} 
                                            onChange={handleFormChange}
                                            required
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label>Status</label>
                                          <select 
                                            name="status" 
                                            value={formData.status || 'requested'} 
                                            onChange={handleFormChange}
                                            required
                                          >
                                            <option value="requested">Requested</option>
                                            <option value="confirmed">Confirmed</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                          </select>
                                        </div>
                                        <div className="form-group">
                                          <label>Notes</label>
                                          <textarea 
                                            name="notes" 
                                            value={formData.notes || ''} 
                                            onChange={handleFormChange}
                                          />
                                        </div>
                                      </>
                                    )}
                                    
                                    <div className="modal-actions">
                                      <button type="submit" className="save-btn">
                                        {editingItem ? 'Update' : 'Save'}
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
                      
                      export default AdminDashboard;