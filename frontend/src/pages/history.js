import React, { useState } from 'react';
import Cookies from 'universal-cookie';

const History = () => {
    const cookies = new Cookies();
    const email = cookies.get("email");
    const [histories, setHistories] = useState([]);

    const getPreviousItems = () => {
        //get from database
    }

    return (
        <div>
            {email ? 
                <ul>
                    {histories.map((history, index) => (
                        <li key={index}>
                            {history.date}
                            {history.ingredient}
                        </li>
                    ))}
                </ul>
                : <div></div>
            }
        </div>
        
    );
}

export default History;