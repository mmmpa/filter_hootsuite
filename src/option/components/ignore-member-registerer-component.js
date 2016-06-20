import * as React from 'react';
import * as ReactDOM from 'react-dom';

export default class IgnoreMemberRegistererComponent extends React.Component {
  componentWillMount() {
    this.setState({name: ''});
  }

  register() {
    this.props.register(this.state.name);
    this.setState({name: ''});
  }

  render() {
    return <div className="ignore-registerer">
      <button onClick={() => this.register()}>Register</button>
      <input type="text" value={this.state.name}
             placeholder="@user_name"
             onChange={(e) => this.setState({name: e.target.value})}/>
    </div>
  }
}
