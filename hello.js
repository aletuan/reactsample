var HelloMessage = React.createClass({
  render: function() {
    return <div>{this.props.message}</div>
  }
});

var HelloReact = React.createClass({
  getInitialState: function() {
    return {
      message: 'default state'
    };
  },

  updateMessage: function(e) {
    console.info('update state')
    this.setState({
      message: this.refs.messageTextBox.value
    });
  },

  render: function() {
    return (
      <div>
        <HelloMessage message="Hello React" />
        <input type="text" ref="messageTextBox" />
        <button onClick={this.updateMessage}>Update</button>
        <div>{this.state.message}</div>
      </div>
    )
  }
});

ReactDOM.render(<HelloReact />, document.getElementById('container'));
