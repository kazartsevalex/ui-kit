import React from 'react';

import { types } from './types';
import classes from './styles.module.css';

const MaskedInput = ({ type }) => {
  console.log(types, type);
  return (
    <div>
      <input className={classes.Input} />
    </div>
  )
};

export default MaskedInput;
