import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    const [number, setNumber] = useState<number>(0)

    const onClickIncButtonHandler = () => {
        setNumber(number + 1)
    }

    const onClickResetButtonHandler = () => {
        setNumber(0)
    }

    let incButtonClass = (number === 5) ? "button disabled" : "button"
    let resetButtonClass = (number === 0) ? "button disabled" : "button"
    let numberClass = (number === 5) ? "number red" : "number"

    return (
        <div className="wrapper">
            <div className="App">
                <div className={numberClass}>{number}</div>
                <div className="buttons">
                    <button className={incButtonClass} onClick={onClickIncButtonHandler} disabled={number === 5}>inc
                    </button>
                    <button className={resetButtonClass} onClick={onClickResetButtonHandler}
                            disabled={number === 0}>reset
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
