"use strict";

var HelloMessage = React.createClass({
  displayName: "HelloMessage",

  // adding methods following component life cycle
  componentWillMount: function componentWillMount() {
    console.log("componentWillMount calling");
  },

  componentDidMount: function componentDidMount() {
    console.log("componentDidMount calling");
  },

  componentWillUnmount: function componentWillUnmount() {
    console.log("componentDidMount calling");
  },

  render: function render() {
    console.log("render");
    return React.createElement(
      "h1",
      null,
      this.props.message
    );
  }
});

// Adding Button component
var Button = React.createClass({
  displayName: "Button",

  render: function render() {
    return React.createElement(
      "button",
      { onClick: this.props.onClick },
      this.props.children
    );
  }
});

var GlyphIcon = React.createClass({
  displayName: "GlyphIcon",

  render: function render() {
    return React.createElement("span", { className: 'glyphicon glyphicon-' + this.props.icon });
  }
});

var TextBox = React.createClass({
  displayName: "TextBox",

  getInitialState: function getInitialState() {
    return {
      isEditing: false,
      // keep content of text input
      text: this.props.label
    };
  },

  // disable textbox, and set send date to other
  update: function update() {
    console.info("TextBox call update method");
    this.props.trigger(this.refs.messageTextBox.value); //call update of other

    this.setState({
      isEditing: false,
      text: this.refs.messageTextBox.value
      //another way to get text, deprecated
      //text: this.refs.messageTextBox.getDOMNode().value
    });

    console.info("TextBox text: " + this.state.text);
  },

  // enable textbox for editing
  edit: function edit() {
    this.setState({
      isEditing: true
    });
  },

  render: function render() {
    return React.createElement(
      "div",
      null,
      this.props.label,
      React.createElement("input", { type: "text", ref: "messageTextBox", disabled: !this.state.isEditing }),
      this.state.isEditing ? React.createElement(
        Button,
        { onClick: this.update },
        React.createElement(GlyphIcon, { icon: "ok" }),
        "Update"
      ) : React.createElement(
        Button,
        { onClick: this.edit },
        React.createElement(GlyphIcon, { icon: "pencil" }),
        "Edit"
      )
    );
  }
});

var HelloReact = React.createClass({
  displayName: "HelloReact",
  getDefaultProps: function getDefaultProps() {
    return { likes: 0 };
  },
  getInitialState: function getInitialState() {
    return { isIncreasing: false };
  },


  // called after rendering, before update state
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps calling");
    console.log("nextProps.likes " + nextProps.likes);
    this.setState({ isIncreasing: nextProps.likes > this.props.likes });
  },
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate calling");
    console.log("nextProps.like ", nextProps.likes, " nextState.isIncreasing ", nextState.isIncreasing);
    return nextProps.likes > 1;
  },
  shouldDidUpdate: function shouldDidUpdate(prevProps, prevState) {
    console.log("shouldDidUpdate calling");
    console.log("prevProps.like ", prevProps.likes, " prevProps.isIncreasing ", prevProps.isIncreasing);
  },
  like: function like() {
    this.setProps({ likes: this.props.likes + 1 });
  },
  unlike: function unlike() {
    this.setProps({ likes: this.props.likes - 1 });
  },
  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        Button,
        { onClick: this.like },
        React.createElement(GlyphIcon, { icon: "thumbs-up" }),
        "Likes"
      ),
      React.createElement(
        Button,
        { onClick: this.unlike },
        React.createElement(GlyphIcon, { icon: "thumbs-down" }),
        "Unlike"
      ),
      React.createElement("br", null),
      "Likes ",
      this.props.likes
    );
  }
});

/*
var HelloReact = React.createClass({

  getInitialState: function() {
    console.log('HelloReact call initial state')
    return {
      firstName: 'Tuan Anh',
      lastName: 'Le'
    };
  },

  update: function(key, value) {
    console.info('HelloReact call update');
    console.info('key ' + key);
    console.info('val ' + value);
    var newState = {};
    newState[key] = value;
    this.setState(newState);
  },

  // from HelloReact, firstName, and lastName was send as key
  // together value input from HelloTextBox to update method
  render: function() {
    return (
      <div>
        <HelloMessage message="React Simple Form" />
        <TextBox label="First Name " trigger={this.update.bind(null, "firstName")} />
        <TextBox label="Last Name  " trigger={this.update.bind(null, "lastName")} />
      </div>
    )
  }
});
*/

ReactDOM.render(React.createElement(HelloReact, null), document.getElementById('container'));
