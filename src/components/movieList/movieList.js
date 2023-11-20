import React, { useEffect, useState } from "react"
import "./movieList.css"
import { useParams } from "react-router-dom"
import Cards from "../card/card"

const MovieList = (props) => {

    const items = props.items
    console.log(items)
    const { type } = useParams()

    return (
        <div className="movie__list">
            <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
            <div className="list__cards">
                {
                    items.map(movie => (
                        <Cards key={movie.title} movie={movie} />
                    ))
                }
            </div>
        </div>
    )
}

export default MovieList