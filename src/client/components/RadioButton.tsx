import { h, Component } from "preact";
import "./styles.less";
import { RippleBox } from "./RippleBox";

// It's 2017 and HTML is still embarassing.  Use this hack to maintain radio button check updates from the underlying peer. slowly. tsk.
let radios: RadioButton[] = [];

function updateCheck() {
    radios.forEach(r => { r.setState({...r.state, checked: r.elem.checked})});
}

export class RadioButton extends Component<{title: string, name: string, value: string}, {checked: boolean}> {
    elem: HTMLInputElement

    componentDidMount() {
        radios.push(this);
    }

    componentDidUnmount() {
        radios.splice(radios.indexOf(this), 1);
    }

    render() {
        return <label className={"md-radio-button" + (this.state.checked ? " is-checked" : "")}>
                    <input ref={e => this.elem = e as HTMLInputElement} name={this.props.name} type="radio" value={this.props.value} onChange={updateCheck}/>
                    <span className="radio-circle"/>
                    <span className="radio-dot"/>
                    <span className="label">{this.props.title}</span>
                    <RippleBox extraClasses="point-ripple invert-primary" /></label>
    }
}