import React from 'react';
import Home from './containers/Pages/Home';
import { BrowserRouter } from 'react-router-dom';
import { ProvideAuth } from './context/use-auth';

const App = props => {
  return (
    <ProvideAuth>
      <BrowserRouter>
        <div>
          <Home />
        </div>
      </BrowserRouter>
    </ProvideAuth>

  );
}

export default App;
