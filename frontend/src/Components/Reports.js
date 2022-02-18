import React, { useEffect, useState } from 'react'
import { OperationsTable } from './OperationsTable'



const baseUrl = 'http://localhost:8080';
export const Reports = () => {

    const [showButton, setshowButton] = useState(true);
    const [operations, setOperations] = useState([])

    useEffect(() => {
        getOperations();
    }, [])

    const getOperations = async() => {
        await fetch(`${baseUrl}/getOperations`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => resp.json())
        .then(data => {
            setOperations(data.reverse())
        }).catch(console.error)
    }


    const handleClick = () => {
        setshowButton(!showButton);
        getOperations();
    }

    return (
        <div style={{ width: '70%' }}>
            <br />
            <div
                className='d-flex justify-content-between'
            >
                <h1>Logs</h1>
                <button
                    className={`btn ${showButton ? 'btn-info' : 'btn-warning'}`}
                    onClick={handleClick}
                >{`${showButton ? 'Hide' : 'Show'}`}</button>
            </div>
            <br />
            {
                operations.length > 0 ? (
                    <>
                        {showButton && (<OperationsTable operations={operations} />)}
                    </>
                ) : (
                    <pre>No info yet. :(</pre>
                )
            }

        </div>
    )
}
