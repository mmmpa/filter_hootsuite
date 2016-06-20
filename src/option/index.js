import * as React from 'react';
import * as ReactDOM from 'react-dom';
import OptionEditor from './contexts/option-editor';

class Option{
  static run(dom){
    ReactDOM.render(<OptionEditor/>, dom);
  }
}

Option.run(document.querySelector('#filter-hootsuite-option'));