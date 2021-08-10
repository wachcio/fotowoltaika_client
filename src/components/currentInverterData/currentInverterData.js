import { useEffect, useContext } from 'react';
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

    useEffect(async () => setcurrentInverterData(await getInverterRealtimeDataCID()), []);

    return (
        <div className="CurrentInverterData">
            <p>Produkcja łącznie: {yearEnergyKWH}</p>
            <p>Produkcja dziś: {dayEnergyKWH}</p>
            <p>Produkcja aktualna: {currentProduction}</p>
            <p>Aktualna częstotliwość: {currentFrequency}</p>
        </div>
    );
}

export default CurrentInverterData;
