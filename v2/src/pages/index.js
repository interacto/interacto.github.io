import * as React from "react"
import Layout from "../components/layout";
import {navigate} from "../../.cache/commonjs/gatsby-browser-entry";

// styles

// markup
const IndexPage = () => {
    navigate('/home');
  return (
        <Layout pageTitle={""}>
        </Layout>
  )
}

export default IndexPage
