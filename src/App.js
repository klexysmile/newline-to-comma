import './App.css';
import {useState} from 'react';

function App() {

    const initialState = {
        stringMode: false,
        output:'',
        input:''
    };

    let output = "";

    const [state, updateState] = useState(initialState);

    const toggleState = () => {
        let oldMode = state.stringMode;
        output = getNewOutput(state.input, !oldMode);

        updateState(() => {

            return {...state, stringMode: !oldMode, output : output}

        });

    };

    function getNewOutput(value, stringMode = false) {
        if (stringMode){
            output = "\"" + value.replace(/\n/g, '", "');

            if(output.charAt(output.length - 1) === '"'){
                output = output.substr(0, output.length - 3);
            }

            if(output.charAt(output.length - 1) !== '"'){
                output += "\"";
            }
        } else {
            output = value.replace(/\n/g, ', ');
        }
        return output;
    }

    const handleInputChange = (event) => {
        let value = event.target.value;

        output = getNewOutput(value, state.stringMode);

        updateState(() => {
           return {...state, output: output, input: value}
        });
    };

    const copyText = () => {
        navigator.clipboard.writeText(state.output).then(() => {
            alert("Text copied");
        });
    };

    return (
        <div>
            <header>
                <div className="App-header">
                    <h1>Replace new lines with commas</h1>
                </div>
            </header>
            <div className="divider"/>
            <div className="App-body">
                <textarea className="textarea-box" value={state.input} onChange={handleInputChange}/>

                <div className="options-holder">
                    <div onClick={toggleState} className={state.stringMode ? "white-button" : "red-button" }>{state.stringMode ? "Number Mode>>" : "String Mode>>" }</div>
                </div>

                <div id="" className="textarea-box output-box">
                    {state.output}
                </div>
            </div>
            <div className="App-body">
                <input onClick={copyText} className="white-button" value="Copy Output" type="button"/>
            </div>
        </div>
    );
}

export default App;
