// src/components/Sidebar.js
import React from 'react';
import { Nav } from 'react-bootstrap';
import {
  FaTachometerAlt,
  FaUser,
  FaProjectDiagram,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';

const Sidebar = ({ onSelectMenu }) => {
  return (
    <Nav defaultActiveKey="dashboard" className="flex-column vh-100 bg-dark text-white p-3">
      <Nav.Item className="mb-4">
        <h3 className="text-center">MyApp</h3>
      </Nav.Item>
      <Nav.Link
        eventKey="dashboard"
        onClick={() => onSelectMenu('dashboard')}
        className="d-flex align-items-center mb-3 text-white"
      >
        <FaTachometerAlt className="me-2" /> Dashboard
      </Nav.Link>
      <Nav.Link
        eventKey="user"
        onClick={() => onSelectMenu('user')}
        className="d-flex align-items-center mb-3 text-white"
      >
        <FaUser className="me-2" /> User
      </Nav.Link>
      <Nav.Link
        eventKey="projects"
        onClick={() => onSelectMenu('projects')}
        className="d-flex align-items-center mb-3 text-white"
      >
        <FaProjectDiagram className="me-2" /> Projects
      </Nav.Link>
      <Nav.Link
        eventKey="settings"
        onClick={() => onSelectMenu('settings')}
        className="d-flex align-items-center mb-3 text-white"
      >
        <FaCog className="me-2" /> Settings
      </Nav.Link>
      <div className="mt-auto">
        <Nav.Link
          eventKey="logout"
          onClick={() => alert('Logging out...')}
          className="d-flex align-items-center text-white"
        >
          <FaSignOutAlt className="me-2" /> Logout
        </Nav.Link>
      </div>
    </Nav>
  );
};

export default Sidebar;