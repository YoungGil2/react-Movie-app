
function MovieCard({movies}: any){
  const { title, useRating, actor, diretor, image } = movies;
  return (
    <div>
      <div>{ title }</div>
      <img src={image} />
      <div>{ useRating }</div>
      <div>{ actor }</div>
      <div>{ diretor }</div>
    </div>
  )
}

export default MovieCard;