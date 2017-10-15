var HelloMessage = React.createClass({
  // adding methods following component life cycle
  componentWillMount: function() {
    console.log("componentWillMount calling");
  },

  componentDidMount: function() {
    console.log("componentDidMount calling");
  },

  componentWillUnmount: function() {
    console.log("componentDidMount calling");
  },

  render: function() {
    console.log("render");
    return <h1>{this.props.message}</h1>
  }
});

// Adding Button component
var Button = React.createClass({
  render: function() {
    return (
      <button onClick={this.props.onClick}>
        {this.props.children}
      </button>
    )
  }
});

var GlyphIcon = React.createClass({
  render: function() {
    return (
      <span className={'glyphicon glyphicon-' + this.props.icon} />
    )
  }
});

var TextBox = React.createClass({
  getInitialState: function() {
    return {
      isEditing: false,
      // keep content of text input
      text: this.props.label
    }
  },

  // disable textbox, and set send date to other
  update: function() {
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
  edit: function() {
    this.setState({
      isEditing: true
    })
  },

  render: function() {
    return(
      <div>
        {this.props.label}
        <input type='text' ref="messageTextBox" disabled={!this.state.isEditing} />
        {
          this.state.isEditing ?
            <Button onClick={this.update}><GlyphIcon icon='ok' />Update</Button>
            :
            <Button onClick={this.edit}><GlyphIcon icon='pencil' />Edit</Button>
        }
      </div>
    )
  }
});

var HelloReact = React.createClass({
  getDefaultProps() {
    return {likes: 0};
  },

  getInitialState() {
    return {isIncreasing: false};
  },

  // called after rendering, before update state
  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps calling");
    console.log("nextProps.likes " + nextProps.likes);
    this.setState({isIncreasing: nextProps.likes > this.props.likes});
  },

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate calling");
    console.log("nextProps.like ", nextProps.likes, " nextState.isIncreasing ", nextState.isIncreasing);
    return nextProps.likes > 1;
  },

  shouldDidUpdate(prevProps, prevState) {
    console.log("shouldDidUpdate calling");
    console.log("prevProps.like ", prevProps.likes, " prevProps.isIncreasing ", prevProps.isIncreasing);
  },

  like() {
    this.setProps({likes: this.props.likes + 1});
  },

  unlike() {
    this.setProps({likes: this.props.likes -1});
  },

  render() {
    return (
      <div>
        <Button onClick={this.like}><GlyphIcon icon="thumbs-up" />
          Likes
        </Button>
        <Button onClick={this.unlike}><GlyphIcon icon="thumbs-down" />
          Unlike
        </Button>
        <br />
        Likes {this.props.likes}
      </div>
    )
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

ReactDOM.render(<HelloReact />, document.getElementById('container'));
