import React, { useEffect } from 'react';

const Contact = () => {
  useEffect(() => {
    window.location.href = 'https://www.iitrpr.ac.in/student-affairs/hostel.php';
  }, []);

  return (
    <div>Redirecting...</div> // Optional: You can display a message while the redirection occurs
  );
}

export default Contact;
