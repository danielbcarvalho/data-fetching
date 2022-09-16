import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import { useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';

interface IRepository {
  full_name: string;
  description: string;
}

export function Repo() {
  const params = useParams();
  const currentRepo = params['*'] as string;

  const queryClient = useQueryClient();

  function handleChangeRepoDescription() {
    // api call to update repo description

    const previousRepositories = queryClient.getQueryData<IRepository[]>('repos');

    if (previousRepositories) {
      const newRepositories = previousRepositories.map(repository => {
        if (repository.full_name === currentRepo) {
          return { ...repository, description: 'New description' }
        } else {
          return repository;
        }
      })
      console.log("🚀 ~ file: Repo.tsx ~ line 31 ~ newRepositories ~ newRepositories", newRepositories)
      queryClient.setQueryData('repos', newRepositories);
    }
  }

  return (
    <div className="App">
      <h1>
        {`REPO ${currentRepo}!!!`}
      </h1>
      <button onClick={handleChangeRepoDescription}>
        Alterar descrição
      </button>
    </div>
  )
}

