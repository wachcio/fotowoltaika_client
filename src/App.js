// import { useEffect, useContext } from 'react';
import './SCSS/index.scss';
// import { StoreContext } from './store/storeProvider';
import CurrentInverterData from './components/currentInverterData/currentInverterData';
import MinMaxInverterData from './components/minMaxInverterData/minMaxInverterData';

function App() {
    return (
        <div className="App">
            <CurrentInverterData />
            <MinMaxInverterData />
        </div>
    );
}

export default App;
