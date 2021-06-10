import * as React from 'react'
import { toolbar } from './layout.module.css'
import { body } from './layout.module.css'
import { main } from './layout.module.css'
import { logo } from './layout.module.css'
import { search } from './layout.module.css'
import { highlight } from './layout.module.css'

import {StaticImage} from "gatsby-plugin-image"
import Navigation from "./navigation";

class Layout extends React.Component {
    render() {
        return (
            <main className={main}>
                <title>{this.props.pageTitle}</title>
                <nav className={toolbar} >
                    <StaticImage
                        src={'../images/interacto-logo.png'}
                        alt={'Interacto logo'}
                        layout={'constrained'}
                        width={60}
                        height={60}
                        className={logo}/>
                    <h1>INTERACTO <span className={highlight}>DOCS</span></h1>
                    <span className={search}>
                        <a href={'https://github.com/interacto'}>
                            <StaticImage src={'../images/github.png'} alt={'Github logo'} layout={'constrained'} height={30} loading={"eager"}/>
                        </a>
                        <a href={'https://interacto.github.io/docs/index.html'}>
                            <StaticImage src={'../images/tsdoc.png'} alt={'TSDoc logo'} layout={'constrained'} height={25}/>
                        </a>
                        <a href={"https://www.npmjs.com/package/interacto"}>
                            <img src="https://img.shields.io/npm/v/interacto" alt={"Lien interacto npm"}/>
                        </a>
                        <a href="https://search.maven.org/search?q=interacto">
                            <img src="https://img.shields.io/maven-central/v/io.github.interacto/interacto-javafx" alt={"Lien interacto maven"}/>
                        </a>
                        Search bar goes here
                    </span>
                </nav>
                <Navigation/>
                <div className={body}>
                    {this.props.children}
                </div>
            </main>
        )
    }
}

export default Layout
