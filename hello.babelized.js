'use strict';

var HelloMessage = React.createClass({
  displayName: 'HelloMessage',

  render: function render() {
    return React.createElement(
      'div',
      null,
      this.props.message
    );
  }
});

var HelloReact = React.createClass({
  displayName: 'HelloReact',

  getInitialState: function getInitialState() {
    return {
      message: 'default state'
    };
  },

  updateMessage: function updateMessage(e) {
    console.info('update state');
    this.setState({
      message: this.refs.messageTextBox.value
    });
  },

  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(HelloMessage, { message: 'Hello React' }),
      React.createElement('input', { type: 'text', ref: 'messageTextBox' }),
      React.createElement(
        'button',
        { onClick: this.updateMessage },
        'Update'
      ),
      React.createElement(
        'div',
        null,
        this.state.message
      )
    );
  }
});

ReactDOM.render(React.createElement(HelloReact, null), document.getElementById('container'));
