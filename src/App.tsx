import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import { useFetch } from './hooks/useFetch';

interface IRepository {
  full_name: string;
  description: string;
}

function App() {
  // const [repositories, setRepositories] = useState([]);

  // useEffect(() => {
  //   axios.get('https://api.github.com/users/danielbcarvalho/repos')
  //     .then(response => setRepositories(response.data))
  // }, [])

  const { data: repositories, isLoading } = useFetch<IRepository[]>('users/danielbcarvalho/repos');

  return (
    <div className="App">
      <h1>
        Repositories
      </h1>
      <ul>
        {isLoading && <p>Loading...</p>}
        {repositories?.map((repository: IRepository) => (
          <li key={repository.full_name}>
            <strong>
            {repository.full_name}
            </strong>
            <p>
              {repository.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
