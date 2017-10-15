'use strict';

var TextBox = React.createClass({
  displayName: 'TextBox',

  render: function render() {
    return React.createElement('input', { className: 'form-control',
      name: this.props.name,
      type: 'text',
      onChange: this.props.onChange });
  }
});

var ExampleForm = React.createClass({
  displayName: 'ExampleForm',

  getInitialState: function getInitialState() {
    return {
      form: { firstName: "Tuan Anh", lastName: "Le" }
    };
  },

  onChange: function onChange(e) {
    console.log("ExampleForm - onChange is calling ", e.target.name, ", ", e.target.value);
    this.state.form[e.target.name] = e.target.value;
    this.setState({ form: this.state.form });
  },

  onSubmit: function onSubmit(e) {
    e.preventDefault();
    console.log("ExampleForm - onSubmit is calling");
  },

  render: function render() {
    return React.createElement(
      'form',
      { onSubmit: this.onSubmit },
      React.createElement(TextBox, { name: 'firstName', onChange: this.onChange }),
      React.createElement(TextBox, { name: 'lastName', onChange: this.onChange }),
      React.createElement(
        'button',
        { className: 'btn btn-success', type: 'submit' },
        'Submit'
      )
    );
  }
});

ReactDOM.render(React.createElement(ExampleForm, null), document.getElementById('container'));
