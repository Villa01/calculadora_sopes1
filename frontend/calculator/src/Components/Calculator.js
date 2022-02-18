import React, { useState } from 'react';

import './Calculator.css';
import { CalculatorNumericalPad } from './CalculatorNumericalPad';

const baseUrl = 'http://localhost:8080';

export const Calculator = () => {

    const [screen, setScreen] = useState('0');
    const [operation, setOperation] = useState({
        op1: '',
        operator: '',
        op2: '',
    })

    const appendToScreen = (text) => {
        if (!text) {
            return;
        }

        if (screen === '0') {
            setScreen(text);
        } else {
            setScreen(screen + text);
        }
    }

    const handleOperation = operator => {
        if( !operator )
            return;
        
        if ( operation.op1 === '') {
            // First operator inserted
            setOperation({
                ...operation,
                operator,
                op1: screen
            });
        } else if ( operation.op2 === '') {
            // Second operator inserted
            setOperation({
                ...operation,
                operator,
                op2: screen
            });
        } else {
            // Inserted another operator, gets the result of the first
            // operation and the result becomes the first operator

            //TODO: get first result
            const result = 0;
            setOperation({
                ...operation,
                op1: result,
                op2: screen
            });
        }
        deleteScreen();
    }

    const handleEqual = async() => {

        if ( operation.op1 === '') {
            // First operator inserted
            setOperation({
                ...operation,
                op1: screen
            });
        } else if ( operation.op2 === '') {
            // Second operator inserted
            setOperation({
                ...operation,
                op2: screen
            });
        }
        const requestOperation = {...operation};

        requestOperation.op1 = parseFloat(requestOperation.op1);
        requestOperation.op2 = parseFloat(screen);  
        
        await fetch(`${baseUrl}/doOperation`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(requestOperation)
        }).then( resp => resp.json())
        .then( data => {
            const { result } = data;
            setScreen(result);
        }).catch( console.error )
        setOperation({
            op1: '',
            operator: '',
            op2: '',
        });

    }

    const deleteScreen = () => {
        setScreen('0');
    }

    return (
        <div
            className='bg-dark calculator container row'>
            <div className='row'>
                <div className='col button text-end hover'>
                    <p>{screen}</p>
                </div>
            </div>
            <div className='row bg-danger' style={{ margin: 'auto' }}>
                <button
                    className='col btn btn-danger button'
                    onClick={()=> {handleOperation('/')}}
                >/</button>
                <button
                    className='col btn btn-danger button'
                    onClick={()=> {handleOperation('*')}}
                >*</button>
                <button
                    className='col btn btn-danger button'
                    onClick={()=> {handleOperation('+')}}
                >+</button>
                <button
                    className='col btn btn-danger button'
                    onClick={()=> {handleOperation('-')}}
                >-</button>
                <button
                    className='col btn btn-danger button'
                    onClick={deleteScreen}
                >DEL</button>
            </div>
            <CalculatorNumericalPad appendToScreen={appendToScreen} handleEqual={handleEqual} />
            
        </div>
    )
}
