
import {Switch, Route} from 'react-router-dom'
import { Navbar,  CoinDetail, Homepage} from './components';



function App() {
  return (
    <div className='app'>
      <div className='navigation'>
          <Navbar/>
      </div>
      <div className='main'>
        <div className='Routes'>
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
          <Route exact path="/coin/:coidId">
            <CoinDetail />
          </Route>
          </Switch>
        </div>
      </div>
    
    </div>
  );
}

export default App;
