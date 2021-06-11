import * as React from 'react'
import { body } from './layout.module.css'
import { main } from './layout.module.css'

import Navigation from "./navigation";
import Header from "./header";

class Layout extends React.Component {
    render() {
        return (
            <main className={main}>
                <title>{this.props.pageTitle}</title>
                <Header/>
                <Navigation/>
                <div className={body}>
                    {this.props.children}
                </div>
            </main>
        )
    }
}

export default Layout
