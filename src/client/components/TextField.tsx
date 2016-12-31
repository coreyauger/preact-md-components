import { h, Component } from "preact";

export class TextField extends Component<{prompt: string, value: string, floatingLabel?: boolean}, {focused: boolean, value: string}> {
    constructor(props) {
        super();
        this.setState({ focused: false, value: props.value });
    }

    updateInput = (e: Event) => {
        this.setState({...this.state, value: (e.target as HTMLInputElement).value})
    }

    private setFocus = (e: Event) => {
        this.setState({...this.state, focused: true});
    }

    private clearFocus = (e: Event) => {
        this.setState({...this.state, focused: false});
    }

    render() {
        return <div class={"mdl-field "+(this.props.floatingLabel ? "floating-label " : "")+ (this.state.focused ? " is-focused" : "") + (this.state.value !== "" ? " has-content" : "")}>
                 <input value={this.state.value} onFocus={this.setFocus} onBlur={this.clearFocus} onInput={this.updateInput}/>
                 <label className={this.state.value === "" ? "show-prompt" : "no-prompt"}>{this.props.prompt}</label>
                 <span className="underline"></span>
               </div>
    }
}