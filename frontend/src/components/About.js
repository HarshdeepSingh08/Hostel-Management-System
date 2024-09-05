import React, { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    window.location.href = 'https://www.iitrpr.ac.in/about-iit-ropar';
  }, []);

  return (
    <div>Redirecting...</div> // Optional: You can display a message while the redirection occurs
  );
}

export default About;
