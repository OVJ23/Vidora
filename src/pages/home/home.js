import React, { useEffect, useState } from "react"
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import MovieList from "../../components/movieList/movieList";
// import SearchBar from './SearchBar';
import AWS from 'aws-sdk';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';

const Home = () => {
  let navigate = useNavigate();
  const [items, setItems] = useState([]);
  //const [isVideoPlayerOpen, setVideoPlayerOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log(localStorage.getItem('token'));
      // console.log(localStorage.getItem('refresh_token'));
      // getNotes();
    }
    else {
      navigate("/login", { replace: true });
    }
    AWS.config.update({
      region: 'us-east-1',
      accessKeyId: 'AKIASPLO73TELCGO544H', // Replace with your AWS access key ID
      secretAccessKey: 'My5WIpN8K1jgHMZuicGhvPdhhvONrUy2zqHBlnSv', // Replace with your AWS secret access key
    });

    const tableName = 'video-metadata';
    const docClient = new AWS.DynamoDB.DocumentClient();
    const params = {
      TableName: tableName,
    };

    docClient.scan(params, (err, data) => {
      if (err) {
        console.error('Error scanning DynamoDB table:', err);
      } else {
        setItems(data.Items);
      }
    });
  }, []);



  return (
    <>
      <div className="vidora-home">
        <Header />
        <div className="poster">
          <Carousel
            showThumbs={false}
            autoPlay={true}
            transitionTime={3}
            infiniteLoop={true}
            showStatus={false}
          >
            {
              items.map(movie => (
                <div>
                  <div className="posterImage">
                    <img src={movie.thumbnail} alt='movie' />
                  </div>
                  <div className="posterImage__overlay">
                    <div className="posterImage__title">{movie ? movie.title : ""}</div>
                    <div className="posterImage__description">{movie ? movie.description : ""}</div>
                  </div>
                </div>
              ))
            }
          </Carousel>
        </div>
        <div className="home-movie">
          <MovieList items={items} />
        </div>
      </div>
    </>
  )
}

export default Home




