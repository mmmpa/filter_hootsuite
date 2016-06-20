import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {store} from '../../util/store';
import IgnoreMemberRegistererComponent from '../components/ignore-member-registerer-component'
import IgnoreSetComponent from '../components/ignore-set-component'

export default class OptionEditor extends React.Component {
  componentWillMount() {
    this.setState({ignoreSet: new Set()});
    this.reload();
  }

  register(name) {
    let {ignoreSet} = this.state;
    ignoreSet.add('@' + name.replace(/@/g, '').replace(/\s/g, ''));
    store.saveIgnoreSet(ignoreSet, () => this.reload());
  }

  remove(name) {
    let {ignoreSet} = this.state;
    ignoreSet.delete(name);
    store.saveIgnoreSet(ignoreSet, () => this.reload());
  }

  reload() {
    store.loadIgnoreSet((v) => this.setState({ignoreSet: v}));
  }

  render() {
    let {ignoreSet} = this.state;
    let remove = (name) => this.remove(name);
    let register = (...args) => this.register(...args);

    return <div>
      <IgnoreMemberRegistererComponent {...{register}}/>
      <IgnoreSetComponent {...{ignoreSet, remove}}/>
    </div>
  }
}
