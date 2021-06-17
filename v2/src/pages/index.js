import * as React from "react"
import {navigate} from "../../.cache/commonjs/gatsby-browser-entry";

class IndexPage extends React.Component {
//const IndexPage = () => {
//    navigate('/home');
  componentDidMount() {
    navigate('/home');
  }
  
  render() {
    return <p></p>;
  }
}

export default IndexPage
