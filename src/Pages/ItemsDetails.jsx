import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../Styles/ItemsDetails.scss";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import MoonLoader from "react-spinners/MoonLoader";
import defaultPosterPath from '../Assets/Image/defaultPoster.jpeg';

export default function ItemsDetails() {
    const [details, setDetails] = useState({});
    const [isExpanded, setIsExpanded] = useState(false);
    const [loading, setLoading] = useState(true);
    let { id, media_type } = useParams();

    async function getTrending(id, media_type) {
        setLoading(true);

        try {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/${media_type}/${id}?api_key=f597813c136fdbe4ff8e3e2976da14ad&language=en-US`
            );
            setDetails(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getTrending(id, media_type);
    }, [id, media_type]);
// 'read less' : 'read more...'زر 
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const renderOverviewOrBiography = (text) => {
        if (!text) return null;
        const shouldExpand = text.length > 300;
        return (
            <div>
                <p>{isExpanded ? text : `${text.substring(0, 300)}...`}</p>
                {shouldExpand && (
                    <button onClick={toggleExpand} className="read-more-btn">
                        {isExpanded ? 'read less' : 'read more...'}
                    </button>
                )}
            </div>
        );
    };

    return (
        <>
            {loading ? (
                <div className="Layout">
                    <MoonLoader size={80} color={"#fe1f20"} loading={loading} />
                </div>
            ) : (
                <div className="container item-details">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>details</h2>
                            {details.poster_path || details.profile_path ? (
                                <LazyLoadImage
                                    src={'https://image.tmdb.org/t/p/w500' + (details.poster_path || details.profile_path)}
                                    alt="poster"
                                    effect="blur"
                                />
                            ) : (
                                <LazyLoadImage
                                    src={defaultPosterPath}
                                    alt="default poster"
                                    effect='blur'
                                />
                            )}
                        </div>

                        <div className="col-md-12">
                            {(details.title || details.name) && <h2>{details.title || details.name}</h2>}
                                <div>
                                    {details.overview && <h4>{renderOverviewOrBiography(details.overview)}</h4>}
                                    {details.biography && <h4>{renderOverviewOrBiography(details.biography)}</h4>}
                                </div>
                            {details.homepage ? <h4>- homepage : {details.homepage}</h4> : null}
                            {details.tagline ? <h4>- tagline : {details.tagline}</h4> : null}
                            {details.status ? <h4>- status : {details.status}</h4> : null}
                            {details.birthday ? <h4>- birthday : {details.birthday}</h4> : null}
                            {details.deathday ? <h4>- deathday : {details.deathday}</h4> : null}
                            {details.place_of_birth ? <h4>- place of birth : {details.place_of_birth}</h4> : null}
                            {details.known_for_department ? <h4>- department : {details.known_for_department}</h4> : null}
                            {details.imdb_id ? <h4>- iMDB : {details.imdb_id}</h4> : null}
                            {details.runtime ? <h4>- runtime : {details.runtime}</h4> : null}
                            {details.vote_average ? <h4>- vote average : {details.vote_average}</h4> : null}
                            {details.vote_count ? <h4>- vote count : {details.vote_count}</h4> : null}
                            {details.popularity ? <h4>- popularity : {details.popularity}</h4> : null}
                            {(details.release_date || details.first_air_date) && (
                                <h4>- date : {details.release_date || details.first_air_date}</h4>
                            )}
                            {details.original_language && <h4>- language : {details.original_language}</h4>}
                            {details.adult !== undefined && <h4>- Adult: {details.adult ? 'Yes' : 'No'}</h4>}
                            {details.production_companies && details.production_companies.length > 0 && (
                                <div>
                                    <h4>- Production Companies :</h4>
                                    <div>
                                        {details.production_companies.slice(0, 3).map((company, index) => (
                                            <h4 key={index}>{index + 1} - {company.name}</h4>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}