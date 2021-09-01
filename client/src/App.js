import { useSelector } from 'react-redux';
import './App.css';
import StartInputField from './components/StartInputField';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import MainField from './components/MainField';

function App() {
  const roomId = useSelector(state => state.id.roomId);
  
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <div className='app'>
            <div className='input_field'>
              <StartInputField />
            </div>
          </div>
        </Route>
        <Route path='/:id' exact>
          {roomId ? <MainField></MainField> : <Redirect to='/'></Redirect>}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
