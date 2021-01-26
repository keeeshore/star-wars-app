import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addToList, removeFromList, resetList} from './film.reducer';

export interface FilmProps {
    title: string;
}

export interface FilmsProps  {
    [key: number]: FilmProps
}

function Film(props: any) {
    const [film, setFilm] = useState<FilmProps>({title: 'loading...'});

    // const film = useSelector((store: any) => {
    //     return store.films[props.indexId] || { title: 'loading...'};
    // });

    const dispatch = useDispatch();

    const getFilm = async (url: string) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setFilm(data);
            dispatch(addToList({indexId: props.indexId, data: data}));
        } catch (err: any) {
            console.error('getFilm err : ', err);
        } finally {
            console.log('getFilm finally : ');
        }
    };

    useEffect(() => {
        getFilm(props.url);
        return () => {
            dispatch(removeFromList({indexId: props.indexId}));
        };
    }, []);

    return (
        <li className={'film-details'}>
            {film.title}
        </li>
    );
}

export default Film;
