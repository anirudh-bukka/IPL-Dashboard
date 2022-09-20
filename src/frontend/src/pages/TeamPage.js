import { React, useEffect, useState } from 'react';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import { useParams } from 'react-router-dom';

export const TeamPage = () => {

    const [team, setTeam] = useState();
    const { teamName } = useParams();


    useEffect(
        () => {
            const fetchMatches = async () => {
                // const response = await fetch('http://localhost:8080/team/Sunrisers Hyderabad');
                const response = await fetch(`http://localhost:8080/team/${teamName}`);
                const data = await response.json();
                setTeam(data);
                console.log(data);
            };

            fetchMatches();

        },[]
    );

    if(team === undefined) {
        return <h1>Team Not Found</h1>
    }

    return (
        <div className='TeamPage'>
            <h1>{team?.teamName}</h1>
            <MatchDetailCard teamName={team?.teamName} match={team?.matches[0]}/>
            {team.matches.slice(1).map(match => <MatchSmallCard team={team?.teamName} match={match} />)}
        </div>
    );
}