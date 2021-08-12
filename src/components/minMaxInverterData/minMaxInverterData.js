import { useEffect, useContext } from 'react';
import { getMinMaxInverterData } from '../../helpers/getData';
import { StoreContext } from '../../store/storeProvider';
// import styles from './minMaxInverterData.module.scss'

function MinMaxInverterData() {
    const { minMaxInverterData, setMinMaxInverterData } = useContext(StoreContext);

    const DAY_PMAX =
        !minMaxInverterData?.Body?.Data?.DAY_PMAX?.Value ||
        Number.isNaN(minMaxInverterData?.Body?.Data?.DAY_PMAX?.Value)
            ? '0W'
            : `${(minMaxInverterData?.Body?.Data?.DAY_PMAX?.Value).toFixed(2)}Wh`;
    const YEAR_PMAX =
        !minMaxInverterData?.Body?.Data?.YEAR_PMAX?.Value ||
        Number.isNaN(minMaxInverterData?.Body?.Data?.YEAR_PMAX?.Value)
            ? '0W'
            : `${(minMaxInverterData?.Body?.Data?.YEAR_PMAX?.Value).toFixed(2)}Wh`;
    const TOTAL_PMAX =
        !minMaxInverterData?.Body?.Data?.TOTAL_PMAX?.Value ||
        Number.isNaN(minMaxInverterData?.Body?.Data?.TOTAL_PMAX?.Value)
            ? '0W'
            : `${(minMaxInverterData?.Body?.Data?.TOTAL_PMAX?.Value).toFixed(2)}Wh`;
    const DAY_UACMAX =
        !minMaxInverterData?.Body?.Data?.DAY_UACMAX?.Value ||
        Number.isNaN(minMaxInverterData?.Body?.Data?.DAY_UACMAX?.Value)
            ? '0V'
            : `${(minMaxInverterData?.Body?.Data?.DAY_UACMAX?.Value).toFixed(2)}V`;
    const YEAR_UACMAX =
        !minMaxInverterData?.Body?.Data?.YEAR_UACMAX?.Value ||
        Number.isNaN(minMaxInverterData?.Body?.Data?.YEAR_UACMAX?.Value)
            ? '0V'
            : `${(minMaxInverterData?.Body?.Data?.YEAR_UACMAX?.Value).toFixed(2)}V`;
    const TOTAL_UACMAX =
        !minMaxInverterData?.Body?.Data?.TOTAL_UACMAX?.Value ||
        Number.isNaN(minMaxInverterData?.Body?.Data?.TOTAL_UACMAX?.Value)
            ? '0V'
            : `${(minMaxInverterData?.Body?.Data?.TOTAL_UACMAX?.Value).toFixed(2)}V`;
    const DAY_UDCMAX =
        !minMaxInverterData?.Body?.Data?.DAY_UDCMAX?.Value ||
        Number.isNaN(minMaxInverterData?.Body?.Data?.DAY_UDCMAX?.Value)
            ? '0V'
            : `${(minMaxInverterData?.Body?.Data?.DAY_UDCMAX?.Value).toFixed(2)}V`;
    const YEAR_UDCMAX =
        !minMaxInverterData?.Body?.Data?.YEAR_UDCMAX?.Value ||
        Number.isNaN(minMaxInverterData?.Body?.Data?.YEAR_UDCMAX?.Value)
            ? '0V'
            : `${(minMaxInverterData?.Body?.Data?.YEAR_UDCMAX?.Value).toFixed(2)}V`;
    const TOTAL_UDCMAX =
        !minMaxInverterData?.Body?.Data?.TOTAL_UDCMAX?.Value ||
        Number.isNaN(minMaxInverterData?.Body?.Data?.TOTAL_UDCMAX?.Value)
            ? '0V'
            : `${(minMaxInverterData?.Body?.Data?.TOTAL_UDCMAX?.Value).toFixed(2)}V`;

    useEffect(async () => {
        setMinMaxInverterData(await getMinMaxInverterData());
        return setInterval(async () => {
            setMinMaxInverterData(await getMinMaxInverterData());
        }, 15000);
    }, []);

    return (
        <div className="minMaxInverterData">
            <p>Wartości maksymalne z dziś:</p>
            <p>Produkcja: {DAY_PMAX}</p>
            <p>Napięcie AC: {DAY_UACMAX}</p>
            <p>Napięcie DC: {DAY_UDCMAX}</p>
            <p>Wartości maksymalne w tym roku:</p>
            <p>Produkcja: {YEAR_PMAX}</p>
            <p>Napięcie AC: {YEAR_UACMAX}</p>
            <p>Napięcie DC: {YEAR_UDCMAX}</p>
            <p>Wartości maksymalne od początku:</p>
            <p>Produkcja: {TOTAL_PMAX}</p>
            <p>Napięcie AC: {TOTAL_UACMAX}</p>
            <p>Napięcie DC: {TOTAL_UDCMAX}</p>
        </div>
    );
}

export default MinMaxInverterData;
