/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import {
    // Label,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import dayjs from 'dayjs';
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

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    {' '}
                    <p className="label">
                        {`${dayjs(payload[0].payload.Timestamp).format('HH:mm')}`}
                    </p>
                    <p className="label">{`Produkcja: ${payload[0].value}W`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <>
            <ResponsiveContainer width="100%" height={500}>
                <AreaChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 80,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <CartesianGrid strokeDasharray="0 3 " />
                    <XAxis
                        dataKey="data.timestamp"
                        label={{
                            value: dayDetails
                                ? `${dayjs(dayDetails[0].timestamp).format('YYYY-MM-DD')}`
                                : '',
                            position: 'insideTopLeft',
                            offset: 15,
                        }}
                    />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Area type="monotone" dataKey="Produkcja" stroke="#ffd238" fill="#ffd238" />
                </AreaChart>
            </ResponsiveContainer>
        </>
    );
}
export default Charts;
