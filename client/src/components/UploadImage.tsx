import { useEffect, useState } from "react";
import axios from "axios";

export default function() {
    const [uploadStatus, setUploadStatus] = useState("Upload File");
    const [btnStyle, setBtnStyle] = useState("primary");

    useEffect(() => {
        let dropArea = document.getElementById('drop-area');
        dropArea?.addEventListener('drop', dropFunction, false);
        dropArea?.addEventListener("dragover",function(e){
            e.preventDefault();
        },false);
    }, []);
    
    const dropFunction = (event: any) => {
        event.preventDefault();
        event.stopPropagation()

        let dt = event.dataTransfer;
        let html = dt.getData('text/html');
        let match = html && /\bsrc="?([^"\s]+)"?\s*/.exec(html);
        let url = match && match[1];

        axios.post('/api/v1/kitten', { url: url }).then((res) => {
            console.log(res);
            setUploadStatus("Success");
            setBtnStyle("success");
        }).then((err) => {
            console.log(err);
            if(err != null) {
                setUploadStatus("Failed!")
                setBtnStyle("danger");
            }
        });
    }

    return(
        <>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">Upload Image</button>

            <div className="modal fade" id="exampleModalCenter" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Upload Image</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid" >
                                <img id="drop-area" src="https://www.mbs-plugins.com/images/drop-files-here-extra.jpg" className="img-fluid" alt="Responsive image" />
                            </div>

                            <button className={`btn btn-${btnStyle} w-100 mt-5`}>{uploadStatus}</button> 
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}