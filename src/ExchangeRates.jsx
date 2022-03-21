import React, { useState, useEffect } from 'react';
import { Preloader } from './Preloader';
import { CurrenciesList } from './CurrenciesList';

function ExchangeRates() {
    const [currencies, setCurrencies] = useState({});
    const [today, setToday] = useState();
    const [loading, setLoading] = useState(true);
    const [prevCurrencies, setPrevCurrencies] = useState([]);

    const getPrevUrl = (d) => {
        const day = d.getDate();
        const month = d.getMonth() + 1;
        const strD = `${d.getFullYear()}/${month < 10 ? '0' + month : month}/${
            day < 10 ? '0' + day : day
        }`;
        const url = `https://www.cbr-xml-daily.ru/archive/${strD}/daily_json.js`;
        return url;
    };

    useEffect(() => {
        fetch('https://www.cbr-xml-daily.ru/daily_json.js')
            .then((response) => response.json())
            .then((data) => {
                data.Valute && setCurrencies(data.Valute);
                data.Date && setToday(Date.parse(new Date(data.Date)));
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (today) {
            let tenDaysData = [];
            for (let i = 1; i < 11; i++) {
                const d = new Date(today);
                d.setDate(d.getDate() - i);
                const url = getPrevUrl(d);

                fetch(url)
                    .then((response) => response.json())
                    .then((data) => {
                        data && tenDaysData.push(data);
                    });
            }
            setPrevCurrencies(tenDaysData);
        }
    }, [today]);

    return (
        <main className='container'>
            <h2>{new Date(today).toDateString()} Exchange Rates</h2>
            {loading ? (
                <Preloader />
            ) : (
                <CurrenciesList
                    currencies={currencies}
                    prevCurrencies={prevCurrencies}
                />
            )}
            <div className='api-url'>
                <a
                    href='https://www.cbr-xml-daily.ru/'
                    target='_blank'
                    rel='noreferrer'
                >
                    Курсы валют, API
                </a>
                <a href='!#' target='_blank' rel='noreferrer'>
                    REPO
                </a>
            </div>
        </main>
    );
}

export { ExchangeRates };
