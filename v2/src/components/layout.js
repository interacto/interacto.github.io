import * as React from 'react'
import { sidebar } from './layout.module.css'
import { toolbar } from './layout.module.css'
import { body } from './layout.module.css'
import { main } from './layout.module.css'
import { logo } from './layout.module.css'
import { search } from './layout.module.css'
import { highlight } from './layout.module.css'
import { StaticImage } from "gatsby-plugin-image"
import {navigate} from "../../.cache/gatsby-browser-entry";

class Layout extends React.Component {
    render() {
        return (
            <main className={main}>
                <title>{this.props.pageTitle}</title>
                <nav className={toolbar}>
                    <StaticImage
                        src={'../images/interacto-logo.png'}
                        alt={'Interacto logo'}
                        layout={'constrained'}
                        width={60}
                        height={60}
                        className={logo}/>
                    <h1>INTERACTO <span className={highlight}>DOCS</span></h1>
                    <div className={search}>Search bar goes here</div>
                </nav>
                <nav className={sidebar}>
                    <ul>
                        {/*TODO: Wrap navigate in function to manage promise and hide warning*/}
                        <li><button onClick={()=>{navigate("/")}}>Home</button></li>
                        <li><button onClick={()=>{navigate("/installation")}}>Install</button></li>
                        <li><button onClick={()=>{navigate("/how-to-start")}}>How to Start</button></li>
                        <li><button onClick={()=>{navigate("/interactions")}}>Interactions</button></li>
                        <li><button onClick={()=>{navigate("/commands")}}>Commands/Undo</button></li>
                        <li><button onClick={()=>{navigate("/routines")}}>Routines</button></li>
                        <li><button onClick={()=>{navigate("/front-end-testing")}}>Front-end Testing</button></li>
                        <li><button onClick={()=>{navigate("/irl-examples")}}>IRL Examples</button></li>
                    </ul>
                </nav>
                    <div className={body}>
                        {this.props.children}
                    </div>
            </main>
        )
    }
}

export default Layout
