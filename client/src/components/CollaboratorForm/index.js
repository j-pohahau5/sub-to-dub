import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COLLABORATOR } from '../utils/mutations';

const CollaboratorForm = ({ videoId }) => {
  const [collaboratorRole, setCollaboratorRole] = useState('');

  const [addCollaborator, { error }] = useMutation(ADD_COLLABORATOR);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addCollaborator({
        variables: {
          videoId,
          collaboratorRole,
        },
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="form-group">
        <label htmlFor="collaboratorRole">Collaborator Role:</label>
        <input
          className="form-input"
          placeholder="Enter collaborator role"
          value={collaboratorRole}
          onChange={(event) => setCollaboratorRole(event.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
      {error && <div>There was an error adding collaborator</div>}
    </form>
  );
};

export default CollaboratorForm;
