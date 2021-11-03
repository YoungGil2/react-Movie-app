import React, { useState, useEffect } from 'react';
import MovieCard from './component/MovieCard'
import axios from 'axios';

function App() {
  const client_id = 'tioFMI_bJPIwRfinJ_Gk';
  const client_secret = 'dD7R5xiuRi';
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([])
  useEffect(() => {
    async function MovieSearch (){
      try {
        const resp = await axios.get('/v1/search/movie.json', {
          params: {
            query: search
          },
          headers: {
            'X-Naver-Client-Id': client_id,
            'X-Naver-Client-Secret': client_secret
          }
        });
        if(resp && resp.status === 200){
          const { data } = resp;
          console.log(data.items);
          setMovies(data.items);
        }
      } catch (error) {
        console.log(error);
      }
    }
    MovieSearch();
  },[search])
  return (
    <div>
      <input type='text' onChange={(e) => setSearch(e.target.value)} />
      {movies.map((value, key)=> {
        return (
          <MovieCard movies={value} key={key} />
        );
      })}
    </div>
  );
}

export default App;
