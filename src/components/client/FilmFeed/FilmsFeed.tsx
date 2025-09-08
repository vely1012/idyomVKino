import { useEffect, useState, type JSX } from 'react';
import ivkAPI, { type HallNode, type RelevantData, type SeanceNode } from '../../../ts/API/IvkAPI';
import { default as Film, type FilmProps, type Seance } from '../Film/Film'

import './FilmFeed.css'

// function formFilmPropsList(relevantData: any): FilmProps[] {
function formFilmPropsList(relevantData: RelevantData): FilmProps[] {
    const filmPropsList: FilmProps[] = [];

    for(const f of relevantData.films) {
        const filmSeances: Seance[] = relevantData.seances.reduce((filmSeances: Seance[], seance: SeanceNode) => {
            if(f.id === seance.seance_filmid) {
                // const seanceHall = relevantData.halls.find((h: any) => h.id === seance.seance_hallid);
                const seanceHall = relevantData.halls.find((h: HallNode) => h.id === seance.seance_hallid);
                if(!seanceHall) {
                    return filmSeances
                }
                filmSeances.push({
                    id: seance.id,
                    hallId: seance.seance_hallid,
                    hallName: seanceHall.hall_name,
                    hallPriceStandart: seanceHall.hall_price_standart,
                    hallPriceVIP: seanceHall.hall_price_vip,
                    filmId: seance.seance_filmid,
                    time: seance.seance_time
                })
            }
            return filmSeances
        }, []);

        if(filmSeances.length === 0) {
            continue
        }
        
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
            // let relevantData: any;
            let relevantData: RelevantData;

            const responce = await ivkAPI.getRelevantData();
            if(responce.success) {
                // relevantData = responce.result;
                relevantData = responce.result as RelevantData;
            } else {
                // relevantData = []
                relevantData = { halls: [], films:[], seances: [] };
                console.error(responce.error);
            }

            const resultingFilms = formFilmPropsList(relevantData).map(filmProps => <Film {...filmProps} />)

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