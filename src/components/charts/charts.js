/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
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
import { useStateWithLabel } from '../../helpers/helpers';

function Charts() {
    const { dayDetails } = useContext(StoreContext);
    const [data, setData] = useStateWithLabel('data', []);
    const [biggestDayPAC, setBiggestDayPAC] = useStateWithLabel('biggestDayPAC', 0);

    useEffect(async () => {
        if (dayDetails) {
            // const arr = [];
            setData([]);
            await dayDetails.map(async (el) =>
                setData((prev) => [
                    ...prev,
                    {
                        name: 'PowerReal_PAC_Sum',
                        Produkcja: el.PowerReal_PAC_Sum,
                        Timestamp: el.timestamp,
                    },
                ]),
            );
            setBiggestDayPAC(
                dayDetails.reduce((a, v) => Math.max(a, v.PowerReal_PAC_Sum), -Infinity),
            );
        }
    }, [dayDetails]);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className={styles.customTooltip}>
                    {' '}
                    <p className="label">
                        {`${dayjs(payload[0].payload.timestamp).format('HH:mm')}`}
                    </p>
                    <p className="label">{`Produkcja: ${payload[0].value}W`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <>
            <ResponsiveContainer width={800} height={500} className="styles.customTooltip">
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
                            fill: '#666',
                        }}
                    />
                    <YAxis domain={[0, Math.ceil(biggestDayPAC / 100) * 100 + 200]} />
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
