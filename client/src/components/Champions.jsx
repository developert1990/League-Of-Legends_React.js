import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API, API_BASE } from '../config/index';

export const Champions = () => {
    const [champs, setChamps] = useState();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const response = await fetch(`${API_BASE}/champs`);
        const data = await response.json();
        console.log(data);
        setChamps(Object.values(data))    // 객체를 배열처럼 사용가능
        console.log(champs);
    }

    return (
        <div className="champion-page">
            <div className='champions'>
                {champs && champs.map((data, index) => {
                    return (

                        <Link className="link" key={index} to={{
                            pathname: `/champion/detail/${data.name}`,
                            state: {
                                id: data.id,
                                img: data.image.full,
                                name: data.name,
                                tags: data.tags,
                                title: data.title,
                                desc: data.blurb,
                                stats: data.stats,
                            }
                        }}>
                            <div className='champion'>
                                <img src={`${API.GET_CHAMPION_SQUARE_IMG}/${data.image.full}`} alt="images" />
                                <h2>{data.name}</h2>
                            </div>
                        </Link>

                    )
                })}
            </div>

        </div>
    )
}