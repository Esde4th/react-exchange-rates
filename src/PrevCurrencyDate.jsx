import React from 'react';

function PrevCurrencyDate(props) {
    const { prevCurrencyDate } = props;

    return <p>{new Date(prevCurrencyDate).toDateString()}</p>;
}

export { PrevCurrencyDate };
