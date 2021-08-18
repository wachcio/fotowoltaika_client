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
import styles from './charts.module.scss';

function Charts() {
    const { todayPowerRealPACSum } = useContext(StoreContext);
    const [data, setData] = useState([]);

    useEffect(async () => {
        if (todayPowerRealPACSum) {
            // const arr = [];
            setData([]);
            await todayPowerRealPACSum.map((el) =>
                setData((prev) => [
                    ...prev,
                    {
                        name: 'PowerReal_PAC_Sum',
                        Produkcja: el.PowerReal_PAC_Sum,
                        Timestamp: el.Timestamp,
                    },
                ]),
            );
            // console.log('arr', arr);
            // await setData(arr);
            console.log('data', data);
        }
    }, [todayPowerRealPACSum]);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className={styles.customTooltip}>
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
            <ResponsiveContainer width="100%" height={500} className="styles.customTooltip">
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
                            value: todayPowerRealPACSum
                                ? `${dayjs(todayPowerRealPACSum[0].timestamp).format('YYYY-MM-DD')}`
                                : '',
                            position: 'insideTopLeft',
                            offset: 15,
                        }}
                    />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Area
                        type="monotone"
                        dataKey="Produkcja"
                        stroke="#ffd238"
                        fill="#ffd238"
                        fillOpacity={1}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </>
    );
}
export default Charts;
