// src/components/ProjectCard.js
import React from 'react';
import { Card } from 'react-bootstrap';

const ProjectCard = ({ project, onSelectProject }) => {
  return (
    <Card
      onClick={() => onSelectProject(project)}
      className="h-100 shadow-sm"
      style={{ cursor: 'pointer' }}
    >
      <Card.Body>
        <Card.Title>{project.name}</Card.Title>
        <Card.Text>
          {project.files.length} file{project.files.length !== 1 && 's'}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProjectCard;