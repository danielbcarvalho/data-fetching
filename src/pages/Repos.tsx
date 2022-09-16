import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

interface IRepository {
  full_name: string;
  description: string;
}

export function Repos() {
  const { data: repositories, isFetching, error} = useQuery<IRepository[]>('repos', async () => {
    const response = await axios.get('https://api.github.com/users/danielbcarvalho/repos');

    return response.data;
  }, {
    staleTime: 1000 * 60, // 1 minute
  })

  return (
    <div className="App">
      <h1>
        Repositories
      </h1>
        {error ? <p>{`Error: ${error}`}</p> : null}
      <ul>
        {isFetching && <p>Loading...</p>}
        {repositories?.map((repository: IRepository) => (
          <li key={repository.full_name}>
            <Link to={`repo/${repository.full_name}`}>
            {repository.full_name}
            </Link>
            <p>
              {repository.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

