import * as React from 'react';
import * as ReactDOM from 'react-dom';

export default class IgnoreMemberComponent extends React.Component {
  render() {
    let {name, remove} = this.props;
    return <div className="ignore-member">
      <button onClick={() => remove(name)}>Remove</button>
      <span className="label">{name}</span>
    </div>
  }
}