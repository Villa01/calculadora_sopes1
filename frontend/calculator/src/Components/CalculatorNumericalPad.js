import React from 'react'
import { CalculatorButton } from './CalculatorButton'

export const CalculatorNumericalPad = ({ appendToScreen, handleEqual }) => {
    return (
        <>
            <div className='row' style={{ margin: 'auto' }}>
                <CalculatorButton
                    appendToScreen={appendToScreen}
                    text={'1'}
                />
                <CalculatorButton
                    appendToScreen={appendToScreen}
                    text={'2'}
                />
                <CalculatorButton
                    appendToScreen={appendToScreen}
                    text={'3'}
                />
            </div>
            <div className='row' style={{ margin: 'auto' }}>
                <CalculatorButton
                    appendToScreen={appendToScreen}
                    text={'4'}
                />
                <CalculatorButton
                    appendToScreen={appendToScreen}
                    text={'5'}
                />
                <CalculatorButton
                    appendToScreen={appendToScreen}
                    text={'6'}
                />
            </div>
            <div className='row' style={{ margin: 'auto' }}>
                <CalculatorButton
                    appendToScreen={appendToScreen}
                    text={'7'}
                />
                <CalculatorButton
                    appendToScreen={appendToScreen}
                    text={'8'}
                />
                <CalculatorButton
                    appendToScreen={appendToScreen}
                    text={'9'}
                />
            </div>
            <div className='row' style={{ margin: 'auto' }}>
                <CalculatorButton
                    appendToScreen={appendToScreen}
                    text={'0'}
                />
                <CalculatorButton
                    appendToScreen={appendToScreen}
                    text={'.'}
                />
                <button
                    className='col btn btn-dark button'
                    onClick={handleEqual}
                >=</button>
            </div>
        </>
    )
}
