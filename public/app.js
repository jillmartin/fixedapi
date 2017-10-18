//import React from 'react';
//import ReactDOM from 'react-dom';
class YogaPosesList extends React.Component {
  //react lang
    constructor(props) {
      super(props);
      this.state = {
        poses: [
        //   {
        //   name: "Bear"
        // },
        // {name:"Praying Mantal"},
        // {name:"Tiger Paw"},
        // {name:"Panda Couch"}
        ]
      };
    }
  //react function/api/yogasg
  componentWillMount() {
    axios.get("/api/yogaposes")
      .then((response) => {
        console.log(response)
        console.log(response.data)
        this.setState({
          poses: response.data
        })
      })
      .catch((error) => {
        console.log(error);
      });
    } 
  
    render() {
      let YogaPoseItems = this.state.poses.map( (pose) => {
        return <li>{ pose.name }</li>
      });    
        return (
        <ul>
          { YogaPoseItems }
        </ul>
      );
    }
  }
  
  ReactDOM.render(
    <YogaPosesList/>,
    document.getElementById("poses")
  );