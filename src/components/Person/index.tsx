import './styles.css';
import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Film, {FilmProps, FilmsProps} from "../Film";
import { addToList, resetList } from '../Film/film.reducer';

export interface PersonProps {
    name: string;
    height: string;
    mass: string;
    url: string;
    birth_year: string,
    gender: string;
    films: Array<string>;
    filmArray?: Array<FilmProps>;
}

function Person(props: any) {
    const dispatch = useDispatch();

    const person: PersonProps = useSelector((store: any) => {
        return store.person;
    });

    const films: FilmsProps = useSelector((store: any) => {
        return store.films;
    });


    return (
        <div className={'person-details'}>
            <h3>Details Section</h3>
            <div>Name: { person.name }</div>
            {/*<div>Birth year: { person.birth_year }</div>*/}
            {/*<div>Gender: { person.gender }</div>*/}
            {/*{films.map((film: any, indexId: any) => {*/}
                    {/*return <div key={indexId}> {indexId} : { film }</div>;*/}
                {/*})*/}
            {/*}*/}
            { JSON.stringify(films)}
            <div>List of films:</div>
            <ul>
                {person.films.map((url: string, indexId: any) => {
                        return <Film key={indexId} indexId={indexId} url={url} />;
                    })
                }
            </ul>
        </div>
    );
}

export default Person;