import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `${new Date()}`,
      url: `https://github.com/miguelslima/${new Date()}`,
      techs: ["Node.js", "ReactJS", "React Native"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {

    api.delete(`/repositories/${id}`);

    const response = repositories.filter(repository => repository.id !== id);

    setRepositories(response);
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repositories => (
          <li key={repositories.id}>
            {repositories.title}
            <button onClick={() => handleRemoveRepository(repositories.id)}>Remover</button>
          </li>))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
