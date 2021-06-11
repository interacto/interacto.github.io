import * as React from 'react'
import { header } from './collapsibleMenu.module.css'
import { content } from './collapsibleMenu.module.css'
import { container } from './collapsibleMenu.module.css'
import { chevron } from './collapsibleMenu.module.css'
import {navigate} from "../../.cache/gatsby-browser-entry";

// A menu element that can either be collapsed or expanded to view its contents
class CollapsibleMenu extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.isOpened,
            selected: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({open: !this.state.open})
    }

    render() {
        return (
            <div className={container}>
                <div className={header}>
                    <button onClick={()=> navigate(this.props.headerUrl)}>
                        {this.props.title}
                    </button>

                    <span className={chevron}>
                        <button onClick={(e)=>this.handleClick(e)}>
                            {this.state.open ? ( // Displays the chevrons depending on the state of the collapsible
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down" width="15"
                                     height="15" viewBox="0 0 20 20" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round"
                                     strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <polyline points="6 9 12 15 18 9"/>
                                </svg>
                            ) : <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-right"
                                     width="15" height="15" viewBox="0 0 20 20" strokeWidth="2" stroke="#000000" fill="none"
                                     strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <polyline points="9 6 15 12 9 18"/>
                            </svg>
                            }
                        </button>
                    </span>
                </div>
                {this.state.open ? ( // Displays the contents of the collapsible if its is expanded
                    <div className={content}>
                        {this.props.children}
                    </div>
                ) : null}
            </div>
        )
    }
}

export default CollapsibleMenu
