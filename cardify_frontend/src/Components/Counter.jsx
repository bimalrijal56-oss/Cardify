import React from 'react'
import CountUpModule from 'react-countup'

const CountUp = CountUpModule?.default || CountUpModule;

const Counter = ({ end }) => {
    return (
        <CountUp start={0} end={end} duration={5} suffix="+" />
    )
}

export default Counter;
