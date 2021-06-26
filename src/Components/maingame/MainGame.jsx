import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router';
import { getRoom } from '../../Services/game';

const MainGame = () => {
    const {roomId} = useParams();
    const [questions, setQuestions] = useState([]);
    
    useEffect(() => {
        getRoom(roomId, ()=>{
            //loading
        },response => {
            console.log(response);
        });
    }, [roomId])
    return (
        <div>
            {roomId}
        </div>
    )
}

export default MainGame;
