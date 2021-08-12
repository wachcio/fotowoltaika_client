import axios from 'axios';

export const getInverterRealtimeDataCID = async () =>
    axios
        .get(
            process.env.REACT_APP_API_BASE_URL +
                process.env.REACT_APP_GET_INVERTER_REALTIME_DATA_CID,
        )
        .then(({ data }) => data);

export const getInverterRealtimeData3PID = async () =>
    axios
        .get(
            process.env.REACT_APP_API_BASE_URL +
                process.env.REACT_APP_GET_INVERTER_REALTIME_DATA_3PID,
        )
        .then(({ data }) => data);

export const getMinMaxInverterData = async () =>
    axios
        .get(
            process.env.REACT_APP_API_BASE_URL +
                process.env.REACT_APP_GET_INVERTER_REALTIME_DATA_MinMaxID,
        )
        .then(({ data }) => data);
