import { useEffect, useContext } from 'react';
import dayjs from 'dayjs';
import { getInverterRealtimeDataCID } from '../../helpers/getData';
import { StoreContext } from '../../store/storeProvider';
// import styles from './currentInverterData.module.scss'

function CurrentInverterData() {
    const { currentInverterData, setcurrentInverterData } = useContext(StoreContext);
    const yearEnergyKWH =
        !currentInverterData?.Body?.Data?.TOTAL_ENERGY?.Value ||
        Number.isNaN(currentInverterData?.Body?.Data?.TOTAL_ENERGY?.Value)
            ? ''
            : `${(currentInverterData?.Body?.Data?.TOTAL_ENERGY?.Value / 1000).toFixed(2)}kWh`;
    const dayEnergyKWH =
        !currentInverterData?.Body?.Data?.DAY_ENERGY?.Value ||
        Number.isNaN(currentInverterData?.Body?.Data?.DAY_ENERGY?.Value)
            ? ''
            : `${(currentInverterData?.Body?.Data?.DAY_ENERGY?.Value / 1000).toFixed(2)}kWh`;
    const currentProduction =
        !currentInverterData?.Body?.Data?.PAC?.Value ||
        Number.isNaN(currentInverterData?.Body?.Data?.PAC?.Value)
            ? '0W'
            : `${currentInverterData?.Body?.Data?.PAC?.Value}W`;
    const currentFrequency =
        !currentInverterData?.Body?.Data?.FAC?.Value ||
        Number.isNaN(currentInverterData?.Body?.Data?.FAC?.Value)
            ? '0Hz'
            : `${(currentInverterData?.Body?.Data?.FAC?.Value).toFixed(2)}Hz`;
    const currentAmperageAC =
        !currentInverterData?.Body?.Data?.IAC?.Value ||
        Number.isNaN(currentInverterData?.Body?.Data?.IAC?.Value)
            ? '0A'
            : `${(currentInverterData?.Body?.Data?.IAC?.Value).toFixed(2)}A`;
    const currentVoltageAC =
        !currentInverterData?.Body?.Data?.UAC?.Value ||
        Number.isNaN(currentInverterData?.Body?.Data?.UAC?.Value)
            ? '0V'
            : `${(currentInverterData?.Body?.Data?.UAC?.Value).toFixed(2)}V`;
    const currentAmperageDC =
        !currentInverterData?.Body?.Data?.IDC?.Value ||
        Number.isNaN(currentInverterData?.Body?.Data?.IDC?.Value)
            ? '0A'
            : `${(currentInverterData?.Body?.Data?.IDC?.Value).toFixed(2)}A`;
    const currentVoltageDC =
        !currentInverterData?.Body?.Data?.UDC?.Value ||
        Number.isNaN(currentInverterData?.Body?.Data?.UDC?.Value)
            ? '0V'
            : `${(currentInverterData?.Body?.Data?.UDC?.Value).toFixed(2)}V`;
    const timestampData =
        !currentInverterData?.Head?.Timestamp || Number.isNaN(currentInverterData?.Head?.Timestamp)
            ? ''
            : `${dayjs(currentInverterData?.Head?.Timestamp).format('YYYY-MM-DD HH:mm')}`;

    useEffect(async () => setcurrentInverterData(await getInverterRealtimeDataCID()), []);

    return (
        <div className="CurrentInverterData">
            <p>Produkcja aktualna: {currentProduction}</p>
            <p>Produkcja dziś: {dayEnergyKWH}</p>
            <p>Produkcja łącznie: {yearEnergyKWH}</p>
            <p>Aktualna częstotliwość: {currentFrequency}</p>
            <p>Aktualne natężenie prądu zmiennego: {currentAmperageAC}</p>
            <p>Aktualne napięcie prądu zmiennego: {currentVoltageAC}</p>
            <p>Aktualne natężenie prądu stałego: {currentAmperageDC}</p>
            <p>Aktualne napięcie prądu stałego: {currentVoltageDC}</p>
            <p>Aktualizacja: {timestampData}</p>
        </div>
    );
}

export default CurrentInverterData;
