import React from "react"
import { StaticQuery, graphql } from "gatsby"
import {sidebar} from "./navigation.module.css";
import {navigate} from "../../.cache/gatsby-browser-entry";
import CollapsibleMenu from "./collapsibleMenu";
import { submenu } from './navigation.module.css'

/**
 * Formats the provided text in order to make it usable in a standard gatsby-plugin-mdx URL.
 * This function is meant to replicate the process by which the heading link URLs are generated by gatsby-remark-autolink-headers.
 * @param text The intial text to transform
 * @return {string} The transformed text, ready to be used in an URL
 */
function formatToUrl(text) {
    return text
        .replace(/\s+/g, '-') // Spaces are converted into dashes.
        .toLowerCase() // The string is converted to lowercase
        .replace(/[^a-z0-9-._~]/g,'') // Any character which is not a letter, number, or one of "-", ".", "_", "~" is removed.
}

/**
 * Orders a list of pages according to their "index" frontmatter attribute.
 * If a page has a negative or null index, it is removed from the list.
 * @param pageList The list of pages to order
 */
function orderPages(pageList) {
    return pageList
        .filter(page => page.frontmatter.index !== null && page.frontmatter.index >= 0 )
        .sort(pageComparator)
}

/**
 * Compares two pages by their index.
 * @param page1 The first page to compare.
 * @param page2 The second page to compare.
 * @return {number} Result of the comparison of the two page indexes
 */
function pageComparator(page1, page2) {
    const comparison = page1.frontmatter.index - page2.frontmatter.index;
    if(comparison === 0) {
        console.log('Pages ' + page1.slug + ' and ' + page2.slug + ' have the same index: ' + page1.frontmatter.index + '. Please make sure that every page uses a different index.');
    }
    return comparison;
}

/**
 * A sidebar that displays an index of all Markdown pages of the site, with their list of sections if appropriate.
 */
export default function Navigation() {
    return (
        <StaticQuery
            // Gets the list of all pages with their title, index and h2-level headings
            query={graphql`
                        query allPagesQuery {
                        allMdx {
                            nodes {
                              slug
                              frontmatter {
                                title
                                index
                              }
                              headings(depth: h2) {
                                value
                                depth
                              }
                            }
                        }
                    }
                `}
            render={data => (
                // Displays the sidebar with the automatically generated index
                <nav className={sidebar}>
                    <ul>
                        {orderPages(data.allMdx.nodes).map(page =>
                            // Creates a menu element for every page
                            <li key={page.slug}>
                                {page.headings.length > 0 ?
                                    // If there are any sections (h2-level headings) for the page, then we create a submenu with a link to each section
                                    <CollapsibleMenu title={page.frontmatter.title} isOpened={false} hasContent={true} headerUrl={'/' + page.slug}>
                                        <div className={submenu}>
                                            {page.headings.map(heading =>
                                                // Creates a button linking to one of the sections of the page for every section
                                                <button onClick={()=> navigate('/' + page.slug + '#' + formatToUrl(heading.value))}
                                                        key={page.slug + '/' + heading.value}>
                                                    {heading.value}
                                                </button>
                                            )}
                                        </div>
                                    </CollapsibleMenu>
                                    : // If there are no sections (h2-level headings), then no section links are created
                                    <CollapsibleMenu title={page.frontmatter.title} isOpened={false} hasContent={false} headerUrl={'/' + page.slug}>
                                    </CollapsibleMenu>
                                }
                            </li>
                        )}
                    </ul>
                </nav>
            )}
        />
    )
}
