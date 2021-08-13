import { useContext } from 'react';
import dayjs from 'dayjs';
import { convertDataFromFroniusAPI } from '../../helpers/convertDataFromFroniusAPI';
import { StoreContext } from '../../store/storeProvider';
// import styles from './commonInverterData.module.scss'

function CurrentInverterData() {
    const { commonInverterData } = useContext(StoreContext);
    const { PPPInverterData } = useContext(StoreContext);
    const { stringsCurrentData } = useContext(StoreContext);

    const totalEnergyKWH = convertDataFromFroniusAPI(
        commonInverterData?.Body?.Data?.TOTAL_ENERGY?.Value,
        commonInverterData?.Body?.Data?.TOTAL_ENERGY?.Unit,
        2,
        true,
    );
    const dayEnergyKWH = convertDataFromFroniusAPI(
        commonInverterData?.Body?.Data?.DAY_ENERGY?.Value,
        commonInverterData?.Body?.Data?.DAY_ENERGY?.Unit,
        2,
        true,
    );
    const currentProduction = convertDataFromFroniusAPI(
        commonInverterData?.Body?.Data?.PAC?.Value,
        commonInverterData?.Body?.Data?.PAC?.Unit,
    );

    const currentFrequency = convertDataFromFroniusAPI(
        commonInverterData?.Body?.Data?.FAC?.Value,
        commonInverterData?.Body?.Data?.FAC?.Unit,
    );
    const currentAmperageAC = convertDataFromFroniusAPI(
        commonInverterData?.Body?.Data?.IAC?.Value,
        commonInverterData?.Body?.Data?.IAC?.Unit,
        2,
    );
    const currentVoltageAC = convertDataFromFroniusAPI(
        commonInverterData?.Body?.Data?.UAC?.Value,
        commonInverterData?.Body?.Data?.UAC?.Unit,
        2,
    );
    const currentAmperageDC = convertDataFromFroniusAPI(
        commonInverterData?.Body?.Data?.IDC?.Value,
        commonInverterData?.Body?.Data?.IDC?.Unit,
        2,
    );
    const currentVoltageDC = convertDataFromFroniusAPI(
        commonInverterData?.Body?.Data?.UDC?.Value,
        commonInverterData?.Body?.Data?.UDC?.Unit,
        2,
    );
    const timestampData =
        !commonInverterData?.Head?.Timestamp || Number.isNaN(commonInverterData?.Head?.Timestamp)
            ? ''
            : `${dayjs(commonInverterData?.Head?.Timestamp).format('YYYY-MM-DD HH:mm:ss')}`;

    const currentVoltageACL1 = convertDataFromFroniusAPI(
        PPPInverterData?.Body?.Data?.UAC_L1?.Value,
        PPPInverterData?.Body?.Data?.UAC_L1?.Unit,
        2,
    );
    const currentVoltageACL2 = convertDataFromFroniusAPI(
        PPPInverterData?.Body?.Data?.UAC_L2?.Value,
        PPPInverterData?.Body?.Data?.UAC_L2?.Unit,
        2,
    );
    const currentVoltageACL3 = convertDataFromFroniusAPI(
        PPPInverterData?.Body?.Data?.UAC_L3?.Value,
        PPPInverterData?.Body?.Data?.UAC_L3?.Unit,
        2,
    );
    const currentAmperageACL1 = convertDataFromFroniusAPI(
        PPPInverterData?.Body?.Data?.IAC_L1?.Value,
        PPPInverterData?.Body?.Data?.IAC_L1?.Unit,
        2,
    );
    const currentAmperageACL2 = convertDataFromFroniusAPI(
        PPPInverterData?.Body?.Data?.IAC_L2?.Value,
        PPPInverterData?.Body?.Data?.IAC_L2?.Unit,
        2,
    );
    const currentAmperageACL3 = convertDataFromFroniusAPI(
        PPPInverterData?.Body?.Data?.IAC_L3?.Value,
        PPPInverterData?.Body?.Data?.IAC_L3?.Unit,
        2,
    );
    const CurrentDCString1 =
        !stringsCurrentData?.Current_DC_String_1 ||
        Number.isNaN(stringsCurrentData?.Current_DC_String_1)
            ? '0A'
            : `${stringsCurrentData?.Current_DC_String_1.toFixed(2)}A`;
    const CurrentDCString2 =
        !stringsCurrentData?.Current_DC_String_2 ||
        Number.isNaN(stringsCurrentData?.Current_DC_String_2)
            ? '0A'
            : `${stringsCurrentData?.Current_DC_String_2.toFixed(2)}A`;
    const VoltageDCString1 =
        !stringsCurrentData?.Voltage_DC_String_1 ||
        Number.isNaN(stringsCurrentData?.Voltage_DC_String_1)
            ? '0V'
            : `${stringsCurrentData?.Voltage_DC_String_1.toFixed(2)}V`;
    const VoltageDCString2 =
        !stringsCurrentData?.Voltage_DC_String_2 ||
        Number.isNaN(stringsCurrentData?.Voltage_DC_String_2)
            ? '0V'
            : `${stringsCurrentData?.Voltage_DC_String_2.toFixed(2)}V`;

    const TemperaturePowerstage =
        !stringsCurrentData?.Temperature_Powerstage ||
        Number.isNaN(stringsCurrentData?.Temperature_Powerstage)
            ? '0°C'
            : `${stringsCurrentData?.Temperature_Powerstage.toFixed(2)}°C`;

    return (
        <div className="commonInverterData">
            <p>Produkcja aktualna: {currentProduction}</p>
            <p>Produkcja dziś: {dayEnergyKWH}</p>
            <p>Produkcja łącznie: {totalEnergyKWH}</p>
            <p>Odczyty aktualne:</p>
            <p>Częstotliwość: {currentFrequency}</p>
            <p>Natężenie prądu zmiennego: {currentAmperageAC}</p>
            <p>Natężenie prądu zmiennego L1: {currentAmperageACL1}</p>
            <p>Natężenie prądu zmiennego L2: {currentAmperageACL2}</p>
            <p>Natężenie prądu zmiennego L3: {currentAmperageACL3}</p>
            <p>Napięcie prądu zmiennego: {currentVoltageAC}</p>
            <p>Napięcie prądu zmiennego L1: {currentVoltageACL1}</p>
            <p>Napięcie prądu zmiennego L2: {currentVoltageACL2}</p>
            <p>Napięcie prądu zmiennego L3: {currentVoltageACL3}</p>
            <p>Natężenie prądu stałego: {currentAmperageDC}</p>
            <p>Natężenie prądu stałego string 1: {CurrentDCString1}</p>
            <p>Natężenie prądu stałego string 2: {CurrentDCString2}</p>
            <p>Napięcie prądu stałego: {currentVoltageDC}</p>
            <p>Napięcie prądu stałego string 1: {VoltageDCString1}</p>
            <p>Napięcie prądu stałego string 2: {VoltageDCString2}</p>
            <p>Temperatura inwertera: {TemperaturePowerstage}</p>
            <p>Aktualizacja: {timestampData}</p>
        </div>
    );
}

export default CurrentInverterData;
