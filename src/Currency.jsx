import React, { useState } from 'react';
import { PrevCurrency } from './PrevCurrency';
import { PrevCurrencyDate } from './PrevCurrencyDate';

function Currency(props) {
    const {
        CharCode,
        Nominal,
        Value,
        Previous,
        Name,
        prevCurrencies = [],
    } = props;

    const [coords, setCoords] = useState({});
    const [prevCurrency, setprevCurrency] = useState([]);
    const [prevCurrencyDate, setprevCurrencyDate] = useState([]);
    const [isPrevVisible, setPrevVisible] = useState(false);

    const showTooltip = (e) => {
        setCoords({
            top: e.clientY,
            left: e.clientX,
            visibility: 'visible',
        });
        return;
    };

    const hideToolTip = () => {
        setCoords({ visibility: 'hidden' });
    };

    function showPrevCurrencies() {
        if (prevCurrencies) {
            let prevCurr = [];
            let prevCurrDate = [];
            prevCurrencies.forEach((item) => {
                prevCurr.push(item.Valute[CharCode]);
                prevCurrDate.push(item.Date);
            });
            setprevCurrency(prevCurr);
            setprevCurrencyDate(prevCurrDate);
            setPrevVisible(!isPrevVisible);
        }
    }

    return (
        <div className='valute-container'>
            <div
                className='main-valute-row'
                onMouseOver={showTooltip}
                onMouseOut={hideToolTip}
                onClick={showPrevCurrencies}
            >
                <span>{CharCode}</span> <span>{Nominal}</span>{' '}
                <span>{Value} RUB</span>{' '}
                <span>
                    {(((Value - Previous) / Previous) * 100).toFixed(2)}
                </span>
                <span className='tooltip' style={coords}>
                    {Name}
                </span>
            </div>
            {isPrevVisible ? (
                <div className='second-valute-row'>
                    <div className='date-column'>
                        {prevCurrencyDate.map((prevCurrencyDate, i) => (
                            <PrevCurrencyDate
                                key={i}
                                prevCurrencyDate={prevCurrencyDate}
                            />
                        ))}
                    </div>
                    <div className='valute-column'>
                        {prevCurrency.map((prevCurrency) => (
                            <PrevCurrency
                                key={prevCurrency.Value}
                                {...prevCurrency}
                            />
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export { Currency };
