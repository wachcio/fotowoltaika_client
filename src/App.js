import './SCSS/index.scss';
import UpdateAllData from './components/updateAllData/updateAllData';
import CurrentInverterData from './components/currentInverterData/currentInverterData';
import MinMaxInverterData from './components/minMaxInverterData/minMaxInverterData';
import Charts from './components/charts/charts';

function App() {
    return (
        <div className="App w-full min-h-full  p-4">
            <UpdateAllData />
            <CurrentInverterData />
            <MinMaxInverterData />
            <Charts />
        </div>
    );
}

export default App;
