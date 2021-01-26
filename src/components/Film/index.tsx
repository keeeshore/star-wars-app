import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToList, removeFromList, resetList } from './film.reducer';

export interface FilmProps {
    title: string;
}

export interface FilmsProps extends Array<FilmProps> { }

function Film(props: any) {
    const [film, setFilm] = useState<FilmProps>({ title: ''});

    const dispatch = useDispatch();

    const getFilm = async (url: string) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            data.title += "_" + props.indexId;
            dispatch(addToList({ indexId: props.indexId, data: data, title: data.title }));
            setFilm(data);
        } catch (err: any) {
            // console.error('getFilm err : ', err);
        } finally {
            // console.log('getFilm finally : ');
        }
    };

    useEffect(() => {
        console.log('Film onComponentMount ::: addToList : ', props.indexId, " :" , props.url);
        getFilm(props.url);
        return () => {
            console.log('Film onComponentUnmount ::: removeFromList  : ', props.indexId, " :", film.title);
            dispatch(removeFromList({ indexId: props.indexId, data: film, title: film.title }));
        };
    }, []);

    // useEffect(() => {
    //     console.log('Film useEffect props.url : ', props.url);
    //     if (props.url) {
    //         getFilm(props.url);
    //     }
    // }, [props.url]);

    return (
        <li className={'film-details'}>
            { film.title }
        </li>
    );
}

export default Film;
