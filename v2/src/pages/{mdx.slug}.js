import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout";
import { MDXRenderer } from "gatsby-plugin-mdx"
import {MDXProvider} from "@mdx-js/react";
import Collapsible from "../components/collapsible";

// The primary language, either TS or Java
// The one not chosen as primary will have its code blocks collapsed by default
const userLang = "TypeScript / Angular"

// Decides if the given block should be expanded or collapsed by default depending on the language used
const CollapsiblePre = props => {
    let codeLang;
    // Detects the language of the block from the <pre> HTML element class attribute
    if(props.className === "language-ts") {
        codeLang = "TypeScript / Angular";
    } else if(props.className === "language-java") {
        codeLang = "JavaFX";
    } else if(props.className === "language-html") {
        codeLang = "HTML";
    }
    if(codeLang !== userLang && (codeLang === "JavaFX" || codeLang === "TypeScript / Angular")) {
        // Collapse either Java or TS code blocks if their language is not the primary one
        return <Collapsible lang={codeLang} isOpened={false}><pre {...props}/></Collapsible>
    } else {
        // Code blocks for the primary language and other languages (ex: HTML) are expanded by default
        return <Collapsible lang={codeLang} isOpened={true}><pre {...props}/></Collapsible>
    }
}

// The list of HTML elements to replace by our own components
const components = {
    pre: CollapsiblePre,
}

export default function Template({
                                     data, // this prop will be injected by the GraphQL query below.
                                 }) {
    const { mdx } = data // holds the page data
    const { frontmatter, body } = mdx
    return (
        <Layout>
                <div>
                    <h1>{frontmatter.title}</h1>
                    <MDXProvider components={components}> {/*Replaces some default HTML elements by custom ones for the render*/}
                        <MDXRenderer>{body}</MDXRenderer> {/*Renders the page's mdx content*/}
                    </MDXProvider>
                </div>
        </Layout>
    )
}
export const pageQery = graphql`
  query POST_BY_SLUG($slug: String) {
    mdx(slug: { eq: $slug }) {
      id
      slug
      body
      frontmatter {
        title
      }
    }
  }
`;
