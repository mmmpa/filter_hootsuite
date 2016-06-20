import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IgnoreMemberComponent from './ignore-member-component'

export default class IgnoreSetComponent extends React.Component {
  render() {
    let {remove} = this.props;
    return <div className="ignore-set">
      {[...this.props.ignoreSet].map((name) => <IgnoreMemberComponent {...{key:name, name, remove}}/>)}
    </div>
  }
}
