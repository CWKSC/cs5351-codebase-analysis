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

const Sidebar = ({ onSelectMenu, activeMenu }) => {
  const menuItems = [
    { key: 'dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
    { key: 'user', icon: FaUser, label: 'User' },
    { key: 'projects', icon: FaProjectDiagram, label: 'Projects' },
    { key: 'settings', icon: FaCog, label: 'Settings' },
  ];

  return (
    <Nav className="flex-column vh-100 sidebar py-4">
      <h3 className="text-center mb-4 text-white">MyApp</h3>
      {menuItems.map((item) => (
        <Nav.Link
          key={item.key}
          onClick={() => onSelectMenu(item.key)}
          className={`d-flex align-items-center py-3 ${
            activeMenu === item.key ? 'active' : ''
          }`}
        >
          <item.icon className="me-3" /> {item.label}
        </Nav.Link>
      ))}
      <div className="mt-auto">
        <Nav.Link
          onClick={() => onSelectMenu('logout')}
          className="d-flex align-items-center py-3"
        >
          <FaSignOutAlt className="me-3" /> Logout
        </Nav.Link>
      </div>
    </Nav>
  );
};

export default Sidebar;