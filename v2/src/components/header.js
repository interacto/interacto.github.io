import * as React from 'react'
import { header } from './header.module.css'
import { logo } from './header.module.css'
import { headerRight } from './header.module.css'
import { highlight } from './layout.module.css'

import {StaticImage} from "gatsby-plugin-image"

const Header = () => (
    <header>
        <nav className={header} >
            <StaticImage
                src={'../images/interacto-logo.png'}
                alt={'Interacto logo'}
                layout={'constrained'}
                width={60}
                height={60}
                className={logo}/>
            <h1>INTERACTO <span className={highlight}>DOCS</span></h1>
            <span className={headerRight}>
                <a href={'https://github.com/interacto'}>
                    <StaticImage src={'../images/github.png'} alt={'Github logo'} layout={'constrained'} height={30} loading={"eager"}/>
                </a>
                <a href={'https://interacto.github.io/ts-docs/index.html'}>
                    <StaticImage src={'../images/tsdoc.png'} alt={'TSDoc logo'} layout={'constrained'} height={25}/>
                </a>
                <a href={"https://www.npmjs.com/package/interacto"}>
                    <img src="https://img.shields.io/npm/v/interacto" alt={"Interacto npm Link"}/>
                </a>
                <a href="https://search.maven.org/search?q=interacto">
                    <img src="https://img.shields.io/maven-central/v/io.github.interacto/interacto-javafx" alt={"Maven Interacto Link"}/>
                </a>
            </span>
        </nav>
    </header>
)

export default Header
