import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';
import { FaUserMd, FaUser, FaUserCog, FaCalendarCheck, FaChartLine, FaLock, FaMobileAlt, FaHeartbeat } from 'react-icons/fa';

const HomePage = () => {
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      
      // Animate features section
      if (featuresRef.current && scrollPosition > featuresRef.current.offsetTop + 100) {
        featuresRef.current.classList.add('animate');
      }
      
      // Animate testimonials section
      if (testimonialsRef.current && scrollPosition > testimonialsRef.current.offsetTop + 100) {
        testimonialsRef.current.classList.add('animate');
      }
      
      // Animate stats section
      if (statsRef.current && scrollPosition > statsRef.current.offsetTop + 100) {
        statsRef.current.classList.add('animate');
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Trigger once on load
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Your Health, Our Priority</h1>
          <p className="hero-subtitle">
            A comprehensive healthcare management system designed to streamline patient care, 
            doctor appointments, and administrative tasks.
          </p>
          <div className="hero-buttons">
            <Link to="/login" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Create Account
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Healthcare" />
        </div>
      </section>

      <section className="benefits">
        <div className="benefit-item">
          <div className="benefit-icon">
            <FaCalendarCheck />
          </div>
          <div className="benefit-text">
            <h3>Easy Scheduling</h3>
            <p>Book appointments online with just a few clicks</p>
          </div>
        </div>
        <div className="benefit-item">
          <div className="benefit-icon">
            <FaHeartbeat />
          </div>
          <div className="benefit-text">
            <h3>Health Tracking</h3>
            <p>Monitor your health metrics and history</p>
          </div>
        </div>
        <div className="benefit-item">
          <div className="benefit-icon">
            <FaLock />
          </div>
          <div className="benefit-text">
            <h3>Secure Records</h3>
            <p>Your medical data is encrypted and protected</p>
          </div>
        </div>
        <div className="benefit-item">
          <div className="benefit-icon">
            <FaMobileAlt />
          </div>
          <div className="benefit-text">
            <h3>Mobile Access</h3>
            <p>Access your healthcare info anywhere, anytime</p>
          </div>
        </div>
      </section>

      <section className="features" ref={featuresRef}>
        <div className="section-header">
          <h2>Comprehensive Features</h2>
          <p>Our platform offers specialized tools for everyone in the healthcare ecosystem</p>
        </div>
        <div className="feature-cards">
          <div className="feature-card">
            <div className="feature-icon">
              <FaUserMd />
            </div>
            <h3>For Doctors</h3>
            <ul className="feature-list">
              <li>Manage patient appointments</li>
              <li>Access patient medical history</li>
              <li>Schedule follow-up visits</li>
              <li>Digital prescription management</li>
            </ul>
            <Link to="/login" className="feature-link">Learn More</Link>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaUser />
            </div>
            <h3>For Patients</h3>
            <ul className="feature-list">
              <li>Book appointments online</li>
              <li>View medical records securely</li>
              <li>Receive appointment reminders</li>
              <li>Direct messaging with doctors</li>
            </ul>
            <Link to="/login" className="feature-link">Learn More</Link>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaUserCog />
            </div>
            <h3>For Administrators</h3>
            <ul className="feature-list">
              <li>Manage staff and resources</li>
              <li>Track facility utilization</li>
              <li>Generate operational reports</li>
              <li>Streamline billing processes</li>
            </ul>
            <Link to="/login" className="feature-link">Learn More</Link>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Getting started with our healthcare management system is simple</p>
        </div>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create an Account</h3>
            <p>Register as a patient, doctor, or administrator</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Complete Your Profile</h3>
            <p>Add your personal and medical information</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Book Appointments</h3>
            <p>Schedule visits with healthcare providers</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Receive Care</h3>
            <p>Get the healthcare services you need</p>
          </div>
        </div>
      </section>

      <section className="stats" ref={statsRef}>
        <div className="stat-item">
          <div className="stat-number">10k+</div>
          <div className="stat-label">Patients</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">500+</div>
          <div className="stat-label">Doctors</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">50k+</div>
          <div className="stat-label">Appointments</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">98%</div>
          <div className="stat-label">Satisfaction</div>
        </div>
      </section>

      <section className="testimonials" ref={testimonialsRef}>
        <div className="section-header">
          <h2>What Our Users Say</h2>
          <p>Hear from patients and healthcare providers who use our platform</p>
        </div>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"This system has revolutionized how I manage my practice. Scheduling is seamless, and I can access patient records instantly."</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">DR</div>
              <div className="author-info">
                <h4>Dr. Robert Chen</h4>
                <p>Cardiologist</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"As a patient, I love how easy it is to book appointments and communicate with my doctors. The reminders are also very helpful!"</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">SJ</div>
              <div className="author-info">
                <h4>Sarah Johnson</h4>
                <p>Patient</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"Managing our clinic has never been easier. The administrative tools help us optimize resources and provide better care."</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">MT</div>
              <div className="author-info">
                <h4>Michael Thompson</h4>
                <p>Clinic Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta-content">
          <h2>Ready to Transform Your Healthcare Experience?</h2>
          <p>Join thousands of patients and healthcare providers who are already benefiting from our platform.</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary">Sign Up Now</Link>
            <Link to="/contact" className="btn btn-outline">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;