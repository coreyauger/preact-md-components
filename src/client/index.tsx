import { h, render, Component } from "preact";
import { AppBar } from "./components/AppBar"
import { TextField } from "./components/TextField"
import { Toplevel } from "./components/Toplevel"
import { Button } from "./components/Button"
import { Label } from "./components/Label"
import { IconButton } from "./components/IconButton"
import { MenuButton } from "./components/MenuButton"
import { Checkbox } from "./components/Checkbox"
import { Switch } from "./components/Switch"
import { RadioButton } from "./components/RadioButton"
import { ProgressBar } from "./components/ProgressBar"
import { Spinner } from "./components/Spinner"
import { Slider } from "./components/Slider"
import { Chip } from "./components/Chips"
import { TabStrip } from "./components/Tabs"
import { Menu, MenuItem, MenuSeparator } from "./components/Menu"
import { Dialog } from "./components/Dialog"
import { SplitPane } from "./components/SplitPane"
import { waitForFonts } from "./domutil";
import * as theme from "./theme";

class Demo extends Component<{}, {checked: boolean}> {
    constructor() {
        super();
        this.setState({checked: true});
    }
    render() {
        console.log("Rerender: "+this.state.checked)
        return (<Toplevel>
            <div style={{display: "flex", flexDirection: "column", position: "fixed", top: "0", left: "0", width: "100%", height: "100%"}}> 
            <div style={{flexGrow: "0"}}>
                <AppBar title="Hello!" leftButton={<IconButton><i className="material-icons">menu</i></IconButton>} rightButtons={[<MenuButton menu={<Menu>
                    <MenuItem label="New" action={() => console.log("NEW!")}/>
                    <MenuItem label="Open..."/>
                    <MenuSeparator/>
                    <MenuItem label="Close"/>
                    <MenuItem label="Save"/>
                    <MenuItem label="Save As..."/>
                    <MenuSeparator/>
                    <MenuItem label="Sign Out"/>
                </Menu>}><i className="material-icons">more_vert</i></MenuButton>]}/>
            </div>
            <div style={{flexGrow: "1", position: "relative"}}><TabStrip tabs={[
            {id: "1", title: <label>Stuff</label>, component:
                <div>
                    <p><Button type="fab" onClick={() => console.log("HR")}><i className="material-icons">menu</i></Button></p>
                    <p><Checkbox title="Wee" checked={this.state.checked} onChange={() => this.setState({checked: !this.state.checked})}/></p>
                    <p><Switch title="Wee" checked={this.state.checked}/></p>
                    <p><RadioButton name="buttons" title="Radio 1" value="1" checked={true} /></p>
                    <p><RadioButton name="buttons" title="Radio 2" value="2"/></p>
                    <TextField placeholder="Hello" floatingLabel={true} value=""/>
                    <Dialog title="Dialog" show={false} buttons={[<Button type="flat" onClick={() => console.log("HR")}>Cancel</Button>,<Button type="flat" onClick={() => console.log("HR")}>Ok</Button>]}>
                        <p>Funky muppet</p>
                    </Dialog>
                    <p><Button onClick={() => console.log("close")}>Dialog</Button></p>
                    <p><Slider min={0} max={100} value={50}/></p>
                    <div style="display: flex;"><Chip label="this is a chip" /> <Chip img="https://avatars.slack-edge.com/2015-03-19/4112965323_b07b7ab3f92a618862f9_192.jpg" label="delete me" onDelete={() =>{alert("delete");}} /></div>
                </div>},
            {id: "2", title: <label>Load</label>, component: 
                <div>
                    <p><Label>indeterminate</Label></p>
                    <p><ProgressBar progress={50} buffer={80} indeterminate={true}/></p>
                    <p><Label>normal</Label></p>
                    <p><ProgressBar progress={50} /></p>
                    <p><Label>buffering</Label></p>
                    <p><ProgressBar progress={50} buffer={80} /></p>
                    <p><Spinner/></p>
                </div>},
            {id: "3", title: <label>Split</label>, component:
                <SplitPane first={<div style={{backgroundColor: "#0f0", position: "absolute", width: "100%", height: "100%"}}/>} second={<div style={{backgroundColor: "#f00", position: "absolute", width: "100%", height: "100%"}}/>} axis="horizontal"/>}
            ]} active="2"/></div>
        </div>
    </Toplevel>)
    }    
}

waitForFonts(["Roboto", 'Material Icons'], () => {
    if(process.env["DEBUG"])
        require('preact/devtools')

    render(<Demo/>, document.querySelector("#content"))
    document.body.classList.remove("disable-animation");
}, () => {
    console.error("Oh dear");
});