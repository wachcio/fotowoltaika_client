import { useEffect, useContext } from 'react';
import './SCSS/index.scss';
import { getInverterRealtimeDataCID } from './helpers/getData';
import { StoreContext } from './store/storeProvider';

function App() {
    const { dayEnergy, setDayEnergy } = useContext(StoreContext);
    useEffect(async () => setDayEnergy(await getInverterRealtimeDataCID()), []);

    return (
        <div className="App">
            <p>
                Produkcja roczna:{' '}
                {dayEnergy != null
                    ? `${(dayEnergy.Body.Data.TOTAL_ENERGY.Value / 1000).toFixed(2)}k`
                    : ''}
                {dayEnergy != null ? dayEnergy.Body.Data.TOTAL_ENERGY.Unit : ''}
            </p>
            <p>
                Dzisiejsza produkcja:{' '}
                {dayEnergy != null ? dayEnergy.Body.Data.DAY_ENERGY.Value : ''}
                {dayEnergy != null ? dayEnergy.Body.Data.DAY_ENERGY.Unit : ''}
            </p>
            <p>
                Aktualne natężenie: {dayEnergy != null ? dayEnergy.Body.Data.IDC.Value : ''}
                {dayEnergy != null ? dayEnergy.Body.Data.IDC.Unit : ''}
            </p>
            <p>
                Aktualne napięcie: {dayEnergy != null ? dayEnergy.Body.Data.UDC.Value : ''}
                {dayEnergy != null ? dayEnergy.Body.Data.UDC.Unit : ''}
            </p>
        </div>
    );
}

export default App;
