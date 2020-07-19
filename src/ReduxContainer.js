import React from 'react';
import ReduxComponent from './redux/store';

const ReduxContainer = ({ children }) => {
  return <ReduxComponent>{children}</ReduxComponent>;
};

export default ReduxContainer;
