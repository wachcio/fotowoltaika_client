import CurrentInverterData from '../currentInverterData/currentInverterData';
import MinMaxInverterData from '../minMaxInverterData/minMaxInverterData';
import Charts from '../charts/charts';

function Home() {
    return (
        <>
            <CurrentInverterData />
            <MinMaxInverterData />
            <Charts />
        </>
    );
}

export default Home;
