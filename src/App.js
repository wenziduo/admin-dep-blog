import React from 'react';
import ReduxContainer from './ReduxContainer';
import RouterContainer from './RouterContainer';
import AntdContainer from './AntdContainer';
import './App.less';

function App() {
  return (
    <ReduxContainer>
      <AntdContainer>
        <RouterContainer />
      </AntdContainer>
    </ReduxContainer>
  );
}

export default App;
