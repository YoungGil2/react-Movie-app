import React, { useState, useEffect, useCallback } from 'react';
import MovieCard from './component/MovieCard'
import axios from 'axios';
import './assets/scss/movie/Movie.scss';

function App() {
  const client_id = 'tioFMI_bJPIwRfinJ_Gk';
  const client_secret = 'dD7R5xiuRi';
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [startCount, setStartCount] = useState(1);

  useEffect(()=>{
    MovieSearch(startCount);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[startCount])

  const MovieSearch = useCallback( async (page)=> {
    console.log(page);
    try {
      const resp = await axios.get('/api',
      {
        params: {
          query: search,
          page: page
        }  
      });
      if(resp && resp.status === 200){
        const { data } = resp;
        console.log(data.items);
        if(data.items){
          setMovies(data.items);
        }
      }    
    } catch (error) {
      console.log(error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[startCount, search])
  
  return (
    <div>
      <input type='text' onChange={(e) => setSearch(e.target.value)} onKeyPress={(e) => (e.key === "Enter" ? (MovieSearch(1),setStartCount(1)) : null)}/>
      <button onClick={() => {MovieSearch(1); setStartCount(1);}} >검색</button>
      <div className="movie__container">
        {movies.map((value, key)=> {
          return (
            <MovieCard movies={value} key={key} />
          );
        })}
        {movies.length === 0 &&
          <div>검색된 내용이 없습니다.</div>
        }
      </div>
      {startCount > 11 && <button onClick={()=>{ setStartCount((prevState) => (prevState - 12)) }}>이전</button>}
      {movies.length > 11 && <button onClick={()=> { setStartCount((prevState) => (prevState + 12)) }} >다음</button>}
    </div>
  );
}

export default App;
