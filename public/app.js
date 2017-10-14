//import React from 'react';
//import ReactDOM from 'react-dom';


class yogaPosesList extends React.Component {
  //react lang
    constructor(props) {
      super(props);
      this.state = {
        poses: [
         // {"uncorn"}, {"bear"}, {"Snake"}
        ]
      };
    }
  //react function
    componentWillMount() {
      axios.get('/api/yogaposes')
        .then((response) => {
          //console.log((response.data.results).length) 20 results on a pull
          console.log(response)
          this.setState({
            poses: response
          })
        })
        .catch((error) => {
          console.log(error);
        });
      } 
  
    render() {
      let yogaPoseItems = this.state.poses.map( (pose) => {
        return <li>{ pose.name }</li>
      });    
        return (
        <ul>
          { yogaPoseItems }
        </ul>
      );
    }
  }
  
  ReactDOM.render(
    <yogaPosesList/>,
    document.getElementById("poses")
  );