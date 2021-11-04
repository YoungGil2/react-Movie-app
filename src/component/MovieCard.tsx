import '../assets/scss/movie/MovieCard.scss'

function MovieCard({movies}: any){
  const { title, subtitle, userRating, image, link, pubDate} = movies;
  return (
    <div className="card">
      {image ?  <img src={image} alt={title}/> : <div className="noImg"></div>}
      <a className="card__title" href={link} dangerouslySetInnerHTML={{__html: title}}></a>
      <div className="card__description">{ subtitle }</div>
      <div className="card__description">{ pubDate }년</div>
      <div className="card__description">{ userRating }/10</div>
    </div>
  )
}

export default MovieCard;