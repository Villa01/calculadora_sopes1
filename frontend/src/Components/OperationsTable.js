import React from 'react'

export const OperationsTable = ({ operations }) => {


    return (
        <>
            <table className='table table-dark text-center'>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Operator 1</th>
                        <th>Operator 2</th>
                        <th>Operation</th>
                        <th>Result</th>
                        <th>Date & Time</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        operations.map( ({_id, operator1, operator2, operation, result, datetime}, i) => {
                            return (
                                <tr key={_id}>
                                    <td>{i + 1}</td>
                                    <td>{operator1}</td>
                                    <td>{operator2}</td>
                                    <td>{operation}</td>
                                    <td>{result}</td>
                                    <td>{datetime}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}
