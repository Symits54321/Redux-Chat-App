import logo from './logo.svg';
import './App.css';
import {Provider} from "react-redux";
import {store} from "./store";
import Chatpage from './pages/Chatpage';

import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* it is the main page for all chat execution  */}
        <Chatpage/>
      </div>
    </Provider>
  );
}

export default App;
