// import { Link } from 'react-router-dom'
import { useEffect, useState, type JSX } from 'react';
import { default as ivkAPI } from '../../ts/API/Request';
import { default as Film, type FilmProps, type Seance } from './Film'

function formFilmPropsList(relevantData: any): FilmProps[] {
    let filmPropsList: FilmProps[] = [];

    for(let f of relevantData.films) {
        let filmSeances: Seance[] = relevantData.seances.reduce((filmSeances: Seance[], seance: any) => {
            if(f.id === seance.seance_filmid) {
                let seanceHall = relevantData.halls.find((h: any) => h.id === seance.seance_hallid);
                filmSeances.push({
                    id: seance.id,
                    hallId: seance.seance__hallid,
                    hallName: seanceHall ? seanceHall.hall_name : 'unknown hall',
                    // hallName: seanceHall.hall_name,
                    filmId: seance.seance_filmid,
                    time: seance.seance_time
                })
            }
            return filmSeances
        }, []);

        filmPropsList.push({
            filmName: f.film_name,
            posterSrc: f.film_poster,
            description: f.film_description,
            duration: f.film_duration,
            origin: f.film_origin,
            seances: filmSeances,
        });
    }
    
    return filmPropsList;
}

export default function FilmFeed() {
    const [films, setFilms] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const fetchFilms = async () => {
            let relevantData: any;

            let responce = await ivkAPI.getRelevantData();
            if(responce.success) {
                relevantData = responce.result;
            } else {
                relevantData = [];
                console.error(responce.error);
            }

            let resultingFilms = formFilmPropsList(relevantData).map(filmProps => <Film {...filmProps} />)

            setFilms(resultingFilms);
        };

        fetchFilms();
    }, []);

    return (
        <main className='films'>
            { ...films }
        </main>
    );
}