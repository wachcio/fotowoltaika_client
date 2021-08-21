import { useEffect, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../../store/storeProvider';

export const getDayDetails = async (year, month, day) =>
    axios
        .get(
            `${
                process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_GET_DAY_DETAILS
            }?year=${year}&month=${month}&day=${day}`,
        )
        .then(({ data }) => data);
const UpdateAllData = () => {
    const {
        setCommonInverterData,
        setPPPInverterData,
        setStringsCurrentData,
        setMinMaxInverterData,
        setDayDetails,
        // setTodayPowerRealPACSum,
    } = useContext(StoreContext);

    const getInverterRealtimeDataCID = async () =>
        axios
            .get(
                process.env.REACT_APP_API_BASE_URL +
                    process.env.REACT_APP_GET_INVERTER_REALTIME_DATA_CID,
            )
            .then(({ data }) => data);

    const getInverterRealtimeData3PID = async () =>
        axios
            .get(
                process.env.REACT_APP_API_BASE_URL +
                    process.env.REACT_APP_GET_INVERTER_REALTIME_DATA_3PID,
            )
            .then(({ data }) => data);

    const getMinMaxInverterData = async () =>
        axios
            .get(
                process.env.REACT_APP_API_BASE_URL +
                    process.env.REACT_APP_GET_INVERTER_REALTIME_DATA_MinMaxID,
            )
            .then(({ data }) => data);

    const getStringsCurrentData = async () =>
        axios
            .get(
                process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_GET_STRINGS_CURRENT_DATA,
            )
            .then(({ data }) => data);

    // const getTodayPowerRealPACSum = async () =>
    //     axios
    //         .get(
    //             `${
    //                 process.env.REACT_APP_API_BASE_URL +
    //                 process.env.REACT_APP_GET_TODAY_POWER_REAL_PAC_SUM
    //             }`,
    //         )
    //         .then(({ data }) => data);

    useEffect(async () => {
        setDayDetails(await getDayDetails(2021, 8, 21));
        // setTodayPowerRealPACSum(await getTodayPowerRealPACSum());
        setCommonInverterData(await getInverterRealtimeDataCID());
        setPPPInverterData(await getInverterRealtimeData3PID());
        setMinMaxInverterData(await getMinMaxInverterData());
        setStringsCurrentData(await getStringsCurrentData());

        // return setInterval(async () => {
        //     setCommonInverterData(await getInverterRealtimeDataCID());
        //     setPPPInverterData(await getInverterRealtimeData3PID());
        //     setMinMaxInverterData(await getMinMaxInverterData());
        //     setStringsCurrentData(await getStringsCurrentData());
        // }, process.env.REACT_APP_UPDATE_DATA_TIME || 30000);
    }, []);
    return null;
};
export default UpdateAllData;
