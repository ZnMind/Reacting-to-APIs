import React, { useState, useEffect } from "react";

const App = () => {

    const [films, setFilms] = useState(false);
    const [people, setPeople] = useState(false);
    const [details, setDetails] = useState(null);
    const [peopleDetails, setPeopleDetails] = useState(null);

    const handleFilms = () => {
        setPeople(false);
        setFilms(true);
    }

    const handlePeople = () => {
        setFilms(false);
        setPeople(true);
    }

    useEffect(() => {
        fetch('https://ghibliapi.herokuapp.com/films')
            .then(films => films.json())
            .then(data => setDetails(data))
            .catch(e => console.log(e));
    }, []);

    useEffect(() => {
        fetch('https://ghibliapi.herokuapp.com/people')
            .then(peopleDetails => peopleDetails.json())
            .then(data => setPeopleDetails(data))
            .catch(e => console.log(e));
    }, []);

    if (films == true) {
        return (
            <main className="container">
                <section className="justify-content-center">
                    <ul className="list-group">
                        <div className="col-md-6">
                            <button onClick={handleFilms} className='btn btn-outline-primary'>Films</button>
                            <button onClick={handlePeople} className='btn btn-outline-primary'>People</button>
                            {details.map(details => (
                                <li key={`details-${details.id}`} className="list-group-item justify-content-between">
                                    <h6>{details.title}</h6>
                                    <p>{details.director} - {details.release_date}</p>
                                    <p>{details.description}</p>
                                </li>
                            ))}
                        </div>
                    </ul>
                </section>
            </main>
        )
    } else if (people == true) {
        return (
            <main className="container">
                <section className="justify-content-center">
                    <ul className="list-group">
                        <div className="col-md-6">
                            <button onClick={handleFilms} className='btn btn-outline-primary'>Films</button>
                            <button onClick={handlePeople} className='btn btn-outline-primary'>People</button>
                            {peopleDetails.map(peopleDetails => (
                                <li key={`peopleDetails-${peopleDetails.id}`} className="list-group-item justify-content-center">
                                    <h6>{peopleDetails.name}</h6>
                                    <p>{peopleDetails.gender} - {peopleDetails.age}</p>
                                    <p>Hair Color: {peopleDetails.hair_color}</p>
                                    <p>Eye Color: {peopleDetails.eye_color}</p>
                                </li>
                            ))}
                        </div>
                    </ul>
                </section>
            </main>
        )
    } else {
        return (
            <>
                <h1>Howdy</h1>
                <button onClick={handleFilms} className='btn btn-outline-primary'>Films</button>
                <button onClick={handlePeople} className='btn btn-outline-primary'>People</button>
            </>
        )

    }



}

export default App;