import React from 'react';

import './Calculator.css';

export const Calculator = () => {
  return (
    <div 
        className='bg-dark calculator container row'>
        <div className='row'>
            <div className='col button text-end hover'>
                0
            </div>
        </div>
        <div className='row bg-danger' style={{margin:'auto'}}>
            <button
                className='col btn btn-danger button'
            >/</button>
            <button
                className='col btn btn-danger button'
            >*</button>
            <button
                className='col btn btn-danger button'
            >+</button>
            <button
                className='col btn btn-danger button'
            >-</button>
        </div>
        <div className='row'  style={{margin:'auto'}}>
            <button
                className='col btn btn-dark button'
            >1</button>
            <button
                className='col btn btn-dark button'
            >2</button>
            <button
                className='col btn btn-dark button'
            >3</button>
        </div>
        <div className='row'  style={{margin:'auto'}}>
            <button
                className='col btn btn-dark button'
            >4</button>
            <button
                className='col btn btn-dark button'
            >5</button>
            <button
                className='col btn btn-dark button'
            >6</button>
        </div>
        <div className='row'  style={{margin:'auto'}}>
            <button
                className='col btn btn-dark button'
            >7</button>
            <button
                className='col btn btn-dark button'
            >8</button>
            <button
                className='col btn btn-dark button'
            >9</button>
        </div>
        <div className='row'  style={{margin:'auto'}}>
            <button
                className='col btn btn-dark button'
            >0</button>
            <button
                className='col btn btn-dark button'
            >.</button>
            <button
                className='col btn btn-dark button'
            >=</button>
        </div>
    </div>
  )
}
