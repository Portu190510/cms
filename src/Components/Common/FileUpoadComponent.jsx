import ImageUploader from 'react-image-uploader';
import React, { Component } from 'react';
import Config from '../../config';
import ObjectToQuery from '../../Utils/ObjectToQueryStringUtil';
import axios from 'axios';

var lmsConfig = Config.apiUrl.lms;

function uploadImage(owner, file, progress) {


  axios.post(`${lmsConfig.baseUrl}/file_uploads`, {
    data: {
      attributes: {
        file_name: file.name,
        file_ext: file.type,
        size: file.size,
        upload_type: file.type,
        upload_context_id: owner.id,
        bucket: "string",
        subpath: "string",
        status: "string"
      }
    }
  }).then(response => {
    return response.data;
  }).catch(response => {
    console.log(response);
  });


}

class FileUpoadComponent extends Component {

  render() {
    return (
      <ImageUploader onUpload={uploadImage.bind(this,this.props.onLoadStart)} onRender={(props, state) => {
        // render customized child image state 
        if (props.image) {
          return (
            <div style={{ backgroundImage: `url(${props.image})`, backgroundSize: "100px" }}>
              <button onClick={props.onRequestRemove}>Remove</button>
              {props.error && <div>An error occurred</div>}
            </div>
          );
        }
        // render default child drag target 
        return (
          <div>
            <button onClick={props.onUploadPrompt}>Upload</button>
          </div>
        );
      }
      }></ImageUploader>
    )
  }
}

export default FileUpoadComponent;