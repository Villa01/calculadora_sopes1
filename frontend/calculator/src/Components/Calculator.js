import React, { useState } from 'react';

import './Calculator.css';
import { CalculatorNumericalPad } from './CalculatorNumericalPad';

export const Calculator = () => {

    const [screen, setScreen] = useState('0');
    const [operation, setOperation] = useState({
        op1: '',
        operator: '',
        op2: ''
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

    const handleEqual = () => {

        // TODO: fetch to solve the operation

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
        

        const result = operation.op1 + operation.op2;
        console.log(operation.op1);
        console.log(operation.op2);
        console.log(result);

        setScreen(result);

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
