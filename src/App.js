// import { useEffect, useContext } from 'react';
import './SCSS/index.scss';
// import { StoreContext } from './store/storeProvider';
import CurrentInverterData from './components/currentInverterData/currentInverterData';

function App() {
    return (
        <div className="App">
            <CurrentInverterData />
        </div>
    );
}

export default App;
