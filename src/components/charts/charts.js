import React, { useContext, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { StoreContext } from '../../store/storeProvider';

function Charts() {
    const { dayDetails } = useContext(StoreContext);
    const data = [];

    useEffect(() => {
        if (dayDetails) {
            dayDetails.map((el) =>
                data.push({
                    name: 'PowerReal_PAC_Sum',
                    Produkcja: el.PowerReal_PAC_Sum,
                }),
            );
            console.log('data', data);
        }
    }, [dayDetails]);

    return (
        <>
            <BarChart width={730} height={250} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Produkcja" fill="#82ca9d" />
            </BarChart>
        </>
    );
}
export default Charts;
