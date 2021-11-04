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
    MovieSearch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[startCount])

  const MovieSearch = useCallback( async ()=> {
    try {
      const resp = await axios.get('/v1/search/movie.json', {
        params: {
          query: search,
          display: 12,
          start: startCount
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[startCount, search])
  
  return (
    <div>
      <input type='text' onChange={(e) => setSearch(e.target.value)} onKeyPress={(e) => (e.key === "Enter" ? (MovieSearch()) : null)}/>
      <button onClick={() => {MovieSearch();}} >검색</button>
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
