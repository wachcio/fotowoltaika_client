/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import {
    Label,
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
import { getDayDetails as updateDayDetails } from '../updateAllData/updateAllData';

const duration = require('dayjs/plugin/duration');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(duration);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/Warsaw');

function Charts() {
    const { dayDetails, setDayDetails } = useContext(StoreContext);
    const [data, setData] = useStateWithLabel('data', []);
    // const [biggestDayPAC, setBiggestDayPAC] = useStateWithLabel('biggestDayPAC', 0);
    const [dayToFetch, setDayToFetch] = useStateWithLabel('dayToFetch', dayjs());

    const updateDay = async () => {
        if (dayDetails) {
            setData([]);
            await dayDetails.map(async (el) =>
                setData((prev) => [
                    ...prev,
                    {
                        name: 'PowerReal_PAC_Sum',
                        Produkcja: el.PowerReal_PAC_Sum,
                        EnergyReal_WAC_Sum_Produced: el.EnergyReal_WAC_Sum_Produced,
                        EnergyReal_WAC_Sum_Produced_Until_Now:
                            el.EnergyReal_WAC_Sum_Produced_Until_Now,
                        timestamp: el.timestamp,
                    },
                ]),
            );
            // setBiggestDayPAC(
            //     dayDetails.reduce((a, v) => Math.max(a, v.PowerReal_PAC_Sum), -Infinity),
            // );
        }
    };

    useEffect(async () => {
        await updateDay();
    }, [dayDetails]);

    useEffect(async () => {
        await setDayDetails(
            await updateDayDetails(
                dayjs(dayToFetch).year(),
                dayjs(dayToFetch).month() + 1,
                dayjs(dayToFetch).date(),
            ),
        );
        // await updateDay();
    }, [dayToFetch]);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className={styles.customTooltip}>
                    {' '}
                    <p className="label">
                        {`${dayjs(payload[0].payload.timestamp).format('HH:mm')}`}
                    </p>
                    <p className="label">{`Produkcja: ${
                        Number(payload[0].value) > 1000
                            ? Number(payload[0].value / 1000)
                            : Number(payload[0].value)
                    } ${Number(payload[0].value).toFixed() > 1000 ? 'kWh' : 'Wh'}`}</p>
                    <p className="label">{`Produkcja w watach: ${Number(
                        payload[0].payload.EnergyReal_WAC_Sum_Produced,
                    ).toFixed()}W`}</p>
                    <p className="label">{`Produkcja do teraz: ${
                        payload[0].payload.EnergyReal_WAC_Sum_Produced_Until_Now > 1000
                            ? payload[0].payload.EnergyReal_WAC_Sum_Produced_Until_Now / 1000
                            : payload[0].payload.EnergyReal_WAC_Sum_Produced_Until_Now
                    }${
                        payload[0].payload.EnergyReal_WAC_Sum_Produced_Until_Now > 1000
                            ? 'kWh'
                            : 'Wh'
                    }`}</p>
                </div>
            );
        }

        return null;
    };

    const handleClickChangeDay = async (e, days) => {
        console.log('klik');

        e.preventDefault();
        if (days > 0) {
            console.log('dodawanie');
            await setDayToFetch(dayjs(dayToFetch).add(dayjs.duration({ days: 1 })));
        } else {
            console.log('odejmowanie', dayjs(dayToFetch).subtract(dayjs.duration({ days: 1 })));
            await setDayToFetch(dayjs(dayToFetch).subtract(dayjs.duration({ days: 1 })));
            console.log(await dayToFetch);
        }

        await console.log(dayToFetch);
    };

    return (
        <>
            <button
                onClick={(e) => {
                    handleClickChangeDay(e, -1);
                }}
                type="button"
            >
                Wczoraj
            </button>{' '}
            +++
            <button
                onClick={(e) => {
                    handleClickChangeDay(e, 1);
                }}
                type="button"
            >
                Jutro
            </button>
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
                    <Label value="Pages of my website" offset={0} position="insideTopRight" />
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
                    {/* <YAxis domain={[0, Math.ceil(biggestDayPAC / 100) * 100 + 200]} /> */}
                    <YAxis domain={[0, 10000]} />
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
