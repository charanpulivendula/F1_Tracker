import React from 'react'

const Ordinal = (value) => {
const digit = value%10;

    switch (digit) {
        case 1:
        return 'st';
        case 2:
        return 'nd';
        case 3:
        return 'rd';
        default:
        return 'th';
    }
}

export default Ordinal