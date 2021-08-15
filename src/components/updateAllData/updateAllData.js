import { useEffect, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../../store/storeProvider';

const UpdateAllData = () => {
    const {
        setCommonInverterData,
        setPPPInverterData,
        setStringsCurrentData,
        setMinMaxInverterData,
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

    useEffect(async () => {
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
