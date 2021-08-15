import React, { useContext, useEffect, useState } from 'react';
import {
    Line,
    LineChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { StoreContext } from '../../store/storeProvider';

function Charts() {
    const { dayDetails } = useContext(StoreContext);
    const [data, setData] = useState(0);

    useEffect(() => {
        if (dayDetails) {
            const arr = [];
            dayDetails.map((el) =>
                arr.push({
                    name: 'PowerReal_PAC_Sum',
                    Produkcja: el.PowerReal_PAC_Sum,
                    Timestamp: el.timestamp,
                }),
            );
            console.log('data', data);
            setData(arr);
        }
    }, [dayDetails]);

    return (
        <>
            <ResponsiveContainer width="100%" height={500}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Produkcja" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
}
export default Charts;
