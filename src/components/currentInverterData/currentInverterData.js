import { useEffect, useContext } from 'react';
import dayjs from 'dayjs';
import { getInverterRealtimeDataCID, getInverterRealtimeData3PID } from '../../helpers/getData';
import { StoreContext } from '../../store/storeProvider';
// import styles from './commonInverterData.module.scss'

function CurrentInverterData() {
    const { commonInverterData, setCommonInverterData } = useContext(StoreContext);
    const { PPPInverterData, setPPPInverterData } = useContext(StoreContext);

    const yearEnergyKWH =
        !commonInverterData?.Body?.Data?.TOTAL_ENERGY?.Value ||
        Number.isNaN(commonInverterData?.Body?.Data?.TOTAL_ENERGY?.Value)
            ? '0W'
            : `${(commonInverterData?.Body?.Data?.TOTAL_ENERGY?.Value / 1000).toFixed(2)}kWh`;
    const dayEnergyKWH =
        !commonInverterData?.Body?.Data?.DAY_ENERGY?.Value ||
        Number.isNaN(commonInverterData?.Body?.Data?.DAY_ENERGY?.Value)
            ? '0W'
            : `${(commonInverterData?.Body?.Data?.DAY_ENERGY?.Value / 1000).toFixed(2)}kWh`;
    const currentProduction =
        !commonInverterData?.Body?.Data?.PAC?.Value ||
        Number.isNaN(commonInverterData?.Body?.Data?.PAC?.Value)
            ? '0W'
            : `${commonInverterData?.Body?.Data?.PAC?.Value}W`;
    const currentFrequency =
        !commonInverterData?.Body?.Data?.FAC?.Value ||
        Number.isNaN(commonInverterData?.Body?.Data?.FAC?.Value)
            ? '0Hz'
            : `${(commonInverterData?.Body?.Data?.FAC?.Value).toFixed(2)}Hz`;
    const currentAmperageAC =
        !commonInverterData?.Body?.Data?.IAC?.Value ||
        Number.isNaN(commonInverterData?.Body?.Data?.IAC?.Value)
            ? '0A'
            : `${(commonInverterData?.Body?.Data?.IAC?.Value).toFixed(2)}A`;
    const currentVoltageAC =
        !commonInverterData?.Body?.Data?.UAC?.Value ||
        Number.isNaN(commonInverterData?.Body?.Data?.UAC?.Value)
            ? '0V'
            : `${(commonInverterData?.Body?.Data?.UAC?.Value).toFixed(2)}V`;
    const currentAmperageDC =
        !commonInverterData?.Body?.Data?.IDC?.Value ||
        Number.isNaN(commonInverterData?.Body?.Data?.IDC?.Value)
            ? '0A'
            : `${(commonInverterData?.Body?.Data?.IDC?.Value).toFixed(2)}A`;
    const currentVoltageDC =
        !commonInverterData?.Body?.Data?.UDC?.Value ||
        Number.isNaN(commonInverterData?.Body?.Data?.UDC?.Value)
            ? '0V'
            : `${(commonInverterData?.Body?.Data?.UDC?.Value).toFixed(2)}V`;
    const timestampData =
        !commonInverterData?.Head?.Timestamp || Number.isNaN(commonInverterData?.Head?.Timestamp)
            ? ''
            : `${dayjs(commonInverterData?.Head?.Timestamp).format('YYYY-MM-DD HH:mm:ss')}`;

    const currentVoltageACL1 =
        !PPPInverterData?.Body?.Data?.UAC_L1?.Value ||
        Number.isNaN(PPPInverterData?.Body?.Data?.UAC_L1?.Value)
            ? '0V'
            : `${(PPPInverterData?.Body?.Data?.UAC_L1?.Value).toFixed(2)}V`;
    const currentVoltageACL2 =
        !PPPInverterData?.Body?.Data?.UAC_L2?.Value ||
        Number.isNaN(PPPInverterData?.Body?.Data?.UAC_L2?.Value)
            ? '0V'
            : `${(PPPInverterData?.Body?.Data?.UAC_L2?.Value).toFixed(2)}V`;
    const currentVoltageACL3 =
        !PPPInverterData?.Body?.Data?.UAC_L3?.Value ||
        Number.isNaN(PPPInverterData?.Body?.Data?.UAC_L3?.Value)
            ? '0V'
            : `${(PPPInverterData?.Body?.Data?.UAC_L3?.Value).toFixed(2)}V`;

    useEffect(async () => {
        setCommonInverterData(await getInverterRealtimeDataCID());
        setPPPInverterData(await getInverterRealtimeData3PID());
        return setInterval(async () => {
            setCommonInverterData(await getInverterRealtimeDataCID());
            setPPPInverterData(await getInverterRealtimeData3PID());
        }, process.env.REACT_APP_UPDATE_DATA_TIME || 30000);
    }, []);

    return (
        <div className="commonInverterData">
            <p>Produkcja aktualna: {currentProduction}</p>
            <p>Produkcja dziś: {dayEnergyKWH}</p>
            <p>Produkcja łącznie: {yearEnergyKWH}</p>
            <p>Aktualna częstotliwość: {currentFrequency}</p>
            <p>Aktualne natężenie prądu zmiennego: {currentAmperageAC}</p>
            <p>Aktualne napięcie prądu zmiennego: {currentVoltageAC}</p>
            <p>Aktualne napięcie prądu zmiennego: {currentVoltageACL1}</p>
            <p>Aktualne napięcie prądu zmiennego: {currentVoltageACL2}</p>
            <p>Aktualne napięcie prądu zmiennego: {currentVoltageACL3}</p>
            <p>Aktualne natężenie prądu stałego: {currentAmperageDC}</p>
            <p>Aktualne napięcie prądu stałego: {currentVoltageDC}</p>
            <p>Aktualizacja: {timestampData}</p>
        </div>
    );
}

export default CurrentInverterData;
