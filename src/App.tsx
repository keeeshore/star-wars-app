import React, {useState, useEffect} from 'react';
import './App.css';
import People from './components/People';
import Person from './components/Person';

function App() {
    return (
        <div className='App'>
            <h2>Table with list of people</h2>
            <People />
            <Person />
        </div>
    );
}

export default App;
