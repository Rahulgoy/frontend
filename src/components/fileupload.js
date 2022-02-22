import React, { useState } from 'react';
 import { Upload, Button } from "antd";
 import "../node_modules/video-react/dist/video-react.css";
import { Player } from "video-react"

export default function UploadComponent(props) {
    const initialstate = {
        videoSrc:""
    }

    const [videoSrc , seVideoSrc] = useState("");
    
    // const { videoSrc } = apiData;

    const handleChange = (info) => {
        console.log(info)
        var reader = new FileReader();
      console.log(reader)
      var url = URL.createObjectURL(reader.originFileObj);
      seVideoSrc(url);
     //set the video file to videoSrc here
    };


    return (
        <React.Fragment>
            <div className="action">
                <Upload className="mt-3 mb-3"
                    accept=".mp4"
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture"
                    maxCount={1}
                    onChange={handleChange}>
                    <Button>
                       Upload
                    </Button>
                </Upload>

                <video width="400" controls>
                  <source
                    src={videoSrc.Src}
                    type={videoSrc.type}
                   />
                   Your browser does not support HTML5 video.
                </video>
            </div>

        <Player
          playsInline
          src={videoSrc}
          fluid={false}
          width={480}
          height={272}
      />
        </React.Fragment>
    )
}