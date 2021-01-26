import './styles.css';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getPeopleList } from './people.reducer';
import { update } from '../Person/person.reducer';
import { PersonProps } from '../Person';

export interface PeopleProps {
    status: string;
    count: number;
    next?: string;
    previous?: string;
    results: Array<PersonProps>;
}

function People(props: any) {
    const people: PeopleProps = useSelector((store: any) => {
        return store.people;
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPeopleList());
    }, []);

    return (
        <table className='people'>
            <thead>
            <tr>
                <th>Name</th>
                <th>Height</th>
                <th>Mass</th>
            </tr>
            </thead>
            <tbody>
            {people.results.map((person: any, indexId: any) => {
                return (
                    <tr key={indexId} onClick={() => {
                        dispatch(update(person));
                    }}>
                        <td>{person.name}</td>
                        <td>{person.height}</td>
                        <td>{person.mass}</td>
                    </tr>
                );
            })
            }
            </tbody>
            <tfoot>
            <tr>
                <td colSpan={3}>
                    { people.status }
                    { ' ' }
                    Pagination: { ' ' }
                    {people.previous &&
                    <a href={'#'} onClick={() => {
                        dispatch(getPeopleList(people.previous));
                    }}>Back</a>
                    }
                    { ' ' }
                    {people.next &&
                    <a href={'#'} onClick={() => {
                        // getPeople(people.next)
                        dispatch(getPeopleList(people.next));
                    }}>Next</a>
                    }
                </td>
            </tr>
            </tfoot>
        </table>
    );
}

export default People;
