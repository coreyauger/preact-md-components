import { h, Component, cloneElement } from "preact"
import { RippleBox } from "./RippleBox";
import { globalRect } from "../domutil";

export class Menu extends Component<{x?: number, y?: number, width?: number, height?: number, extraClasses?: string, closeMenu?: () => void}, {visible: boolean, x: number, y: number}> {
    myElem: HTMLElement
    constructor(props) {
        super();
        this.state = { visible: false, x: 0, y: 0};
    }

    componentDidMount() {
        let myRect = globalRect(this.myElem);
        let x = 0;
        let y = 0;
        if(myRect.width + this.props.x > window.innerWidth) {
            // place to left
            x = this.props.x - myRect.width;
        } else {
            x = this.props.x + this.props.width;
        }

        y = this.props.y;
        this.setState({...this.state, visible: true, x: x, y: y});
    }

    render({}, {visible}) {
        return <div ref={x => this.myElem = x as HTMLElement} style={{ visibility: visible ? "visible" : "hidden", left: this.state.x+"px", top: this.state.y+"px"}} className={"md-menu md-cascading-menu" +(this.props.extraClasses ? " "+this.props.extraClasses : "")}>
                    {this.props.children.filter(s => !!s).map(c => cloneElement(c, { closeMenu: this.props.closeMenu }))}
               </div>
    }
}

export class MenuItem extends Component<{label: string, action?: () => void, closeMenu?: () => void}, any> {
    trigger = () => {
        if(this.props.action)
            this.props.action();
        if(this.props.closeMenu)
            this.props.closeMenu();
    }
    render() {
        return <div className="md-menu-item" onClick={this.trigger}><RippleBox/><label>{this.props.label}</label></div>
    }
}

export class MenuSeparator extends Component<any, void> {
    render() {
        return <div className="md-menu-separator"/>
    }
}