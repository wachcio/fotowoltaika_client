import { Switch, Route } from 'react-router-dom';
import Charts from '../charts/charts';
import Home from '../home/home';
import UpdateAllData from '../updateAllData/updateAllData';

function Main() {
    return (
        <div className="App w-full min-h-full  p-4">
            <UpdateAllData />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/day" exact component={Charts} />
            </Switch>
        </div>
    );
}

export default Main;
