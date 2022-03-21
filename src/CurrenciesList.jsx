import React from 'react';
import { Currency } from './Currency';

function CurrenciesList(props) {
    const { currencies = {}, prevCurrencies = [] } = props;

    if (!Object.keys(currencies).length) {
        return <h3>Nothing here</h3>;
    }

    return (
        <div>
            {Object.values(currencies).map((currency) => (
                <Currency
                    key={currency.ID}
                    {...currency}
                    prevCurrencies={prevCurrencies}
                />
            ))}
        </div>
    );
}

export { CurrenciesList };
