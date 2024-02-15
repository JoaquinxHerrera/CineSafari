import React from 'react'
import Main from '../components/Main'
import MovieList from '../components/MovieList'
import Row from '../components/Row'
import requests from '../Request'

const Home = ({search, movies}) => {
  return (
    <div>
       {search ? (
        <>
          <Main/>
          <MovieList movies={movies}/>
        </>
       ) : (
        <>
          <Main/>
          <Row rowID='1' title='UpComing' fetchURL={requests.requestUpcoming}/>
          <Row rowID='2' title='Popular' fetchURL={requests.requestPopular}/>
          <Row rowID='3' title='Trending' fetchURL={requests.requestTrending}/>
          <Row rowID='4' title='Top Rated'fetchURL={requests.requestTopRated}/>
          <Row rowID='5' title='Horror' fetchURL={requests.requestHorror}/>
          <Row rowID='6' title='Comedy' fetchURL={requests.requestComedy}/>
          <Row rowID='7' title='Science Fiction' fetchURL={requests.requestSciFi}/>
        </>
       )}     
    </div>
  )
}

export default Home