import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, Form, Alert } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import ProjectCard from '../components/ProjectCard';
import ProjectDetail from '../components/ProjectDetail';

const Dashboard = () => {
  const [menuSelection, setMenuSelection] = useState('dashboard');
  const [projects, setProjects] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  // Handle creating a new project
  const handleCreateProject = () => {
    if (newProjectName.trim() === '') return;

    const newProject = {
      id: Date.now(),
      name: newProjectName,
      files: [],
    };
    setProjects([...projects, newProject]);
    setNewProjectName('');
    setShowCreateModal(false);
  };

  // Handle selecting a project
  const handleSelectProject = (project) => {
    setSelectedProject(project);
  };

  // Handle going back to projects list
  const handleBack = () => {
    setSelectedProject(null);
  };

  // Handle file upload
  const handleUploadFile = (projectId, file) => {
    const updatedProjects = projects.map((proj) => {
      if (proj.id === projectId) {
        return {
          ...proj,
          files: [...proj.files, file.name],
        };
      }
      return proj;
    });

    setProjects(updatedProjects);

    if (selectedProject && selectedProject.id === projectId) {
      setSelectedProject({
        ...selectedProject,
        files: [...selectedProject.files, file.name],
      });
    }
  };

  // Render main content based on menu selection and project selection
  const renderMainContent = () => {
    // If a project is selected, show its details
    if (selectedProject) {
      return (
        <ProjectDetail
          project={selectedProject}
          onBack={handleBack}
          onUploadFile={handleUploadFile}
        />
      );
    }

    // Render content based on menu selection
    switch (menuSelection) {
      case 'dashboard':
        return (
          <div>
            <h2>Welcome to the Dashboard</h2>
            <p>This is the main dashboard area.</p>
          </div>
        );
      case 'user':
        return (
          <div>
            <h2>User Management</h2>
            <p>Manage your users here.</p>
          </div>
        );
      case 'projects':
        return (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2>Projects</h2>
              <Button variant="primary" onClick={() => setShowCreateModal(true)}>
                + New Project
              </Button>
            </div>
            {projects.length === 0 ? (
              <Alert variant="info">Please create a project.</Alert>
            ) : (
              <Row xs={1} md={3} className="g-4">
                {projects.map((project) => (
                  <Col key={project.id}>
                    <ProjectCard project={project} onSelectProject={handleSelectProject} />
                  </Col>
                ))}
              </Row>
            )}
          </>
        );
      case 'settings':
        return (
          <div>
            <h2>Settings</h2>
            <p>Configure your application settings here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={2} className="p-0">
          <Sidebar onSelectMenu={setMenuSelection} />
        </Col>

        {/* Main Content */}
        <Col md={10} className="p-4">
          {renderMainContent()}
        </Col>
      </Row>

      {/* Create Project Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="projectName">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter project name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateProject} disabled={newProjectName.trim() === ''}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Dashboard;