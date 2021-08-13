import './SCSS/index.scss';
import UpdateAllData from './components/updateAllData/updateAllData';
import CurrentInverterData from './components/currentInverterData/currentInverterData';
import MinMaxInverterData from './components/minMaxInverterData/minMaxInverterData';

function App() {
    return (
        <div className="App">
            <UpdateAllData />
            <CurrentInverterData />
            <MinMaxInverterData />
        </div>
    );
}

export default App;
