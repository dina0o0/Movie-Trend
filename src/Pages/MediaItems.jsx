import React from "react";
import "../Styles/MediaItems.scss";
import { Link } from "react-router-dom";

export default function MediaItems({ item }) {
  return (
    <>
      <Link to={`/itemsdetails/${item.id}/${item.media_type}`}>
        <div className="image-link">

          {item.poster_path ? (
            <img
              className="poster-image"
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt=""
            />
          ) : (
            <img
              className="profile-image"
              src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
              alt=""
            />
          )}

          <div className="overlay">
            <div className="details">
              <p className="name-item">
                {(item.title || item.name)
                  .split(" ")
                  .slice(0, 5)
                  .map((word, index) => (
                    <div key={index} className="word">
                      {word}
                    </div>
                  ))}
              </p>
              {item.release_date || item.first_air_date ? (
                <p>release: {item.release_date || item.first_air_date}</p>
              ) : null}
              {item.known_for_department ? (
                <p>department: {item.known_for_department}</p>
              ) : null}
            </div>
          </div>
          {item.vote_average ? (
            <p className="Vote-circle"> {item.vote_average.toFixed(1)}</p>
          ) : null}
        </div>
      </Link>
    </>
  );
}