// src/utils/dummyData.js

// Generate 10 patients
export const patients = [
    {
      id: 'p1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      contactNumber: '555-123-4567',
      age: 45,
      gender: 'Male',
      address: '123 Main St, Anytown, USA'
    },
    {
      id: 'p2',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      contactNumber: '555-234-5678',
      age: 32,
      gender: 'Female',
      address: '456 Oak Ave, Somewhere, USA'
    },
    {
      id: 'p3',
      name: 'Michael Brown',
      email: 'mbrown@example.com',
      contactNumber: '555-345-6789',
      age: 58,
      gender: 'Male',
      address: '789 Pine St, Nowhere, USA'
    },
    {
      id: 'p4',
      name: 'Emily Davis',
      email: 'emily.d@example.com',
      contactNumber: '555-456-7890',
      age: 27,
      gender: 'Female',
      address: '101 Maple Dr, Anywhere, USA'
    },
    {
      id: 'p5',
      name: 'Robert Wilson',
      email: 'rwilson@example.com',
      contactNumber: '555-567-8901',
      age: 62,
      gender: 'Male',
      address: '202 Cedar Ln, Everywhere, USA'
    },
    {
      id: 'p6',
      name: 'Jennifer Taylor',
      email: 'jtaylor@example.com',
      contactNumber: '555-678-9012',
      age: 41,
      gender: 'Female',
      address: '303 Birch Rd, Someplace, USA'
    },
    {
      id: 'p7',
      name: 'David Martinez',
      email: 'dmartinez@example.com',
      contactNumber: '555-789-0123',
      age: 36,
      gender: 'Male',
      address: '404 Elm St, Othertown, USA'
    },
    {
      id: 'p8',
      name: 'Lisa Anderson',
      email: 'landerson@example.com',
      contactNumber: '555-890-1234',
      age: 29,
      gender: 'Female',
      address: '505 Walnut Ave, Thisplace, USA'
    },
    {
      id: 'p9',
      name: 'James Thomas',
      email: 'jthomas@example.com',
      contactNumber: '555-901-2345',
      age: 53,
      gender: 'Male',
      address: '606 Spruce Blvd, Thatplace, USA'
    },
    {
      id: 'p10',
      name: 'Patricia White',
      email: 'pwhite@example.com',
      contactNumber: '555-012-3456',
      age: 47,
      gender: 'Female',
      address: '707 Aspen Ct, Lastplace, USA'
    }
  ];
  
  // Generate 10 doctors
  export const doctors = [
    {
      id: 'd1',
      name: 'Dr. Elizabeth Green',
      email: 'dr.green@example.com',
      contactNumber: '555-111-2222',
      specialty: 'Cardiology',
      experience: '15 years'
    },
    {
      id: 'd2',
      name: 'Dr. Richard Lee',
      email: 'dr.lee@example.com',
      contactNumber: '555-222-3333',
      specialty: 'Neurology',
      experience: '12 years'
    },
    {
      id: 'd3',
      name: 'Dr. Maria Rodriguez',
      email: 'dr.rodriguez@example.com',
      contactNumber: '555-333-4444',
      specialty: 'Pediatrics',
      experience: '10 years'
    },
    {
      id: 'd4',
      name: 'Dr. William Chen',
      email: 'dr.chen@example.com',
      contactNumber: '555-444-5555',
      specialty: 'Orthopedics',
      experience: '18 years'
    },
    {
      id: 'd5',
      name: 'Dr. Susan Kim',
      email: 'dr.kim@example.com',
      contactNumber: '555-555-6666',
      specialty: 'Dermatology',
      experience: '8 years'
    },
    {
      id: 'd6',
      name: 'Dr. Thomas Jackson',
      email: 'dr.jackson@example.com',
      contactNumber: '555-666-7777',
      specialty: 'Ophthalmology',
      experience: '14 years'
    },
    {
      id: 'd7',
      name: 'Dr. Amanda Patel',
      email: 'dr.patel@example.com',
      contactNumber: '555-777-8888',
      specialty: 'Gynecology',
      experience: '11 years'
    },
    {
      id: 'd8',
      name: 'Dr. Kevin Nguyen',
      email: 'dr.nguyen@example.com',
      contactNumber: '555-888-9999',
      specialty: 'Psychiatry',
      experience: '9 years'
    },
    {
      id: 'd9',
      name: 'Dr. Rachel Cohen',
      email: 'dr.cohen@example.com',
      contactNumber: '555-999-0000',
      specialty: 'Endocrinology',
      experience: '13 years'
    },
    {
      id: 'd10',
      name: 'Dr. Daniel Garcia',
      email: 'dr.garcia@example.com',
      contactNumber: '555-000-1111',
      specialty: 'Urology',
      experience: '16 years'
    }
  ];
  
  // Generate appointments
  export const appointments = [
    {
      id: 'a1',
      patientId: 'p1',
      doctorId: 'd3',
      patientName: 'John Smith',
      doctorName: 'Dr. Maria Rodriguez',
      date: '2023-11-15',
      time: '09:00 AM',
      status: 'confirmed',
      notes: 'Regular checkup'
    },
    {
      id: 'a2',
      patientId: 'p2',
      doctorId: 'd1',
      patientName: 'Sarah Johnson',
      doctorName: 'Dr. Elizabeth Green',
      date: '2023-11-16',
      time: '10:30 AM',
      status: 'completed',
      notes: 'Follow-up appointment'
    },
    {
      id: 'a3',
      patientId: 'p3',
      doctorId: 'd2',
      patientName: 'Michael Brown',
      doctorName: 'Dr. Richard Lee',
      date: '2023-11-17',
      time: '02:00 PM',
      status: 'requested',
      notes: 'New patient consultation'
    },
    {
      id: 'a4',
      patientId: 'p4',
      doctorId: 'd5',
      patientName: 'Emily Davis',
      doctorName: 'Dr. Susan Kim',
      date: '2023-11-18',
      time: '11:15 AM',
      status: 'confirmed',
      notes: 'Skin condition examination'
    },
    {
      id: 'a5',
      patientId: 'p5',
      doctorId: 'd4',
      patientName: 'Robert Wilson',
      doctorName: 'Dr. William Chen',
      date: '2023-11-20',
      time: '03:30 PM',
      status: 'cancelled',
      notes: 'Joint pain consultation'
    },
    {
      id: 'a6',
      patientId: 'p6',
      doctorId: 'd7',
      patientName: 'Jennifer Taylor',
      doctorName: 'Dr. Amanda Patel',
      date: '2023-11-21',
      time: '09:45 AM',
      status: 'confirmed',
      notes: 'Annual checkup'
    },
    {
      id: 'a7',
      patientId: 'p7',
      doctorId: 'd8',
      patientName: 'David Martinez',
      doctorName: 'Dr. Kevin Nguyen',
      date: '2023-11-22',
      time: '01:00 PM',
      status: 'requested',
      notes: 'Initial consultation'
    },
    {
      id: 'a8',
      patientId: 'p8',
      doctorId: 'd6',
      patientName: 'Lisa Anderson',
      doctorName: 'Dr. Thomas Jackson',
      date: '2023-11-23',
      time: '10:00 AM',
      status: 'confirmed',
      notes: 'Vision examination'
    },
    {
      id: 'a9',
      patientId: 'p9',
      doctorId: 'd9',
      patientName: 'James Thomas',
      doctorName: 'Dr. Rachel Cohen',
      date: '2023-11-24',
      time: '02:30 PM',
      status: 'confirmed',
      notes: 'Hormone level check'
    },
    {
      id: 'a10',
      patientId: 'p10',
      doctorId: 'd10',
      patientName: 'Patricia White',
      doctorName: 'Dr. Daniel Garcia',
      date: '2023-11-25',
      time: '11:45 AM',
      status: 'requested',
      notes: 'Urinary tract infection'
    },
    {
        id: 'a11',
        patientId: 'p1',
        doctorId: 'd5',
        patientName: 'John Smith',
        doctorName: 'Dr. Susan Kim',
        date: '2023-11-27',
        time: '10:15 AM',
        status: 'confirmed',
        notes: 'Skin rash follow-up'
      },
      {
        id: 'a12',
        patientId: 'p2',
        doctorId: 'd4',
        patientName: 'Sarah Johnson',
        doctorName: 'Dr. William Chen',
        date: '2023-11-28',
        time: '01:30 PM',
        status: 'confirmed',
        notes: 'Knee pain assessment'
      }
    ];