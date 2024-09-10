import React, { useReducer } from "react";
import { flushSync } from "react-dom";
import { ParseAction, SetFileAction, SetTextAction, fileUploaderReducer } from "./fileUploaderReducer";
import SaveStorage from "./storage/storage";

const worker = new Worker('worker.js');

const FileUploader = () => {

    const [state, dispatch] = useReducer(fileUploaderReducer, {
        file: null,
        text: "",
        parsing: false,
        percentage: undefined,
        json: undefined
    });
    

    if (state.parsing && isNaN(state.percentage)) {
        const start = new Date().getTime();
        var lastPercentage = 0;

        worker.onmessage = (event) => {
            const { percentage, result } = event.data;

            if (percentage >= 1) {
                const amount = new Date().getTime() - start;
                console.log('TIME IN MS: ' + amount);

                SaveStorage.setSave(result);
            } else if (percentage - lastPercentage < 0.02) {
                // updating the screen too often will take twice 
                // as much time than the actual parsing
                return;
            }

            lastPercentage = percentage;
            
            flushSync(() => {
                dispatch(new ParseAction(percentage, result));
            });
        };

        worker.postMessage({
            input: state.text
        });
    }

    const handleFileChange = (e) => {
        if (e.target.files) {
            dispatch(new SetFileAction(e.target.files[0]));
            console.log("SET FILE");
        }
    };

    const handleUpload = () => {
        if (state.file) {
            var reader = new FileReader();
            reader.readAsText(state.file, "UTF-8");
            reader.onload = (evt) => {
                dispatch(new SetTextAction(evt.target.result));
                console.log("SET TEXT");
                // dispatch(new SetLinesAction(evt.target.result.split(/\r\n|\n/)));
            }
            reader.onerror = (evt) => {
                console.error("error reading file");
            }
        }
    };

    return (
        <div className="file-uploader">
            <label htmlFor="file">
                Choose a file
            </label>
            <input id="file" type="file" onChange={handleFileChange} />

            {state.file && <button onClick={handleUpload}>PARSE</button>}

            <br />
            {/* <ProgressBar percentage={state.percentage}></ProgressBar> */}

            <label htmlFor="parser"></label>
            <progress id="parser" value={state.percentage || 0}></progress>

            {/* {
                state.json && <SaveViewer save={state.json}></SaveViewer>
            } */}
        </div >
    )
}

export default FileUploader;