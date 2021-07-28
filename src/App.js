import React from 'react';

import { MaskedInput } from './components';
import { types as maskedInputTypes } from './components/MaskedInput/types';

import classes from './App.module.css';

const App = () => {
  return (
    <main className={classes.Wrapper}>
      <MaskedInput type={maskedInputTypes.PHONE} />
    </main>
  );
}

export default App;
