import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';

function AppCalc() {
    const [number, setNumber] = useState<number>(0)
    const [min, setMin] = useState<number>(0)
    const [max, setMax] = useState<number>(5)
    const [disable, setDisable] = useState<boolean>(true)
    const [error, setError] = useState(false)
    const [editMode, setEditMode] = useState(false)
    useEffect(() => {
        let minString = localStorage.getItem('min')
        let maxString = localStorage.getItem('max')
        if (minString) {
            let minNumber = JSON.parse(minString)
            setMin(minNumber)
        }
        if (maxString) {
            let maxNumber = JSON.parse(maxString)
            setMax(maxNumber)
        }
    }, [])

    useEffect(() => {
        checkedError()
    }, [min, max])

    const onClickIncButtonHandler = () => {
        setNumber(number + 1)
    }
    const onClickSetButtonHandler = () => {
        localStorage.setItem('min', JSON.stringify(min))
        localStorage.setItem('max', JSON.stringify(max))
        setDisable(true)
        setNumber(min)
        setEditMode(false)
    }

    const onClickResetButtonHandler = () => {
        setNumber(min)
    }

    const checkedError = () => {
        if ((min >= max) || (max < 0) || (min < 0)) {
            setError(true)

        } else {
            setError(false)
        }
    }

    const onChangeMaxInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setMax(JSON.parse(e.currentTarget.value))
        setDisable(false)
    }

    const onChangeMinInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setMin(JSON.parse(e.currentTarget.value))
        setDisable(false)
    }

    const setMode=()=>{
        setEditMode(true)
    }

    let incButtonClass = (number === max || !disable) ? "button disabled" : "button"
    let setButtonClass = (error || disable) ? "button disabled" : "button"
    let resetButtonClass = (number === min || !disable) ? "button disabled" : "button"
    let numberClass = (number === max) ? "number red" : "number"

    return (
        <div className="wrapper">

            {editMode ?
                <div className="App">
                    <div className="text">
                        <div className="textValue">
                            <span>max value: </span><input className={error ? 'red' : ''} value={max}
                                                           onChange={onChangeMaxInputHandler} type="number"/>
                        </div>
                        <div className="textValue">
                            <span>start value: </span><input className={error ? 'red' : ''} value={min}
                                                             onChange={onChangeMinInputHandler} type="number"/>
                        </div>
                    </div>
                    <div className="buttons">
                        <button className={setButtonClass} onClick={onClickSetButtonHandler}
                                disabled={error || disable}>set
                        </button>
                    </div>
                </div> :
                <div className="App">
                    {error ? <div className="red">Incorrect value!</div> :
                        (disable ? <div className={numberClass}>{number}</div> :
                            <div className={numberClass}>enter values and press 'set'</div>)}
                    <div className="buttons">
                        <button className={incButtonClass} onClick={onClickIncButtonHandler}
                                disabled={(number === max) || (!disable)}>inc
                        </button>
                        <button className={resetButtonClass} onClick={onClickResetButtonHandler}
                                disabled={(number === min) || !disable}>
                            reset
                        </button>
                        <button className="button" onClick={setMode}>
                            set
                        </button>
                    </div>
                </div>}
        </div>
    );
}

export default AppCalc;
