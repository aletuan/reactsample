var TextBox = React.createClass({
  render: function() {
    return (
      <input className='form-control'
        name={this.props.name}
        type='text'
        onChange={this.props.onChange} />
    );
  }
});

var ExampleForm = React.createClass({
  getInitialState: function() {
    return {
      form: {firstName: "Tuan Anh", lastName: "Le"}
    }
  },

  onChange: function(e) {
    console.log("ExampleForm - onChange is calling ", e.target.name, ", ", e.target.value);
    this.state.form[e.target.name] = e.target.value;
    this.setState({form: this.state.form});
  },

  onSubmit: function(e) {
    e.preventDefault();
    console.log("ExampleForm - onSubmit is calling");
  },

  render: function() {
    return(
      <form onSubmit={this.onSubmit}>
        <TextBox name='firstName' onChange={this.onChange} />
        <TextBox name='lastName' onChange={this.onChange} />
        <button className='btn btn-success' type='submit'>Submit</button>
      </form>
    )
  }
});

ReactDOM.render(<ExampleForm />, document.getElementById('container'));
