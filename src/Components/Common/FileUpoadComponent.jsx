import ImageUploader from 'react-image-uploader';
import React, {Component} from 'react';
 
function uploadImage(file, done, progress) {
  // do your upload logic here 
  let error = null
  let uploadedImageURL = 'dog.jpg'
  done(error, uploadedImageURL)
}
 
class FileUpoadComponent extends Component {
 
  render() {
    return (
      <ImageUploader
        onUpload={this.props.onLoadStart}
        onRender={(props, state) => {
 
          // render customized child image state 
          if (props.image) {
            return (
              <div style={{backgroundImage: `url(${props.image})`}}>
                <button onClick={props.onRequestRemove}>Remove</button>
                {props.error && <div>An error occurred</div>}
              </div>
            )
          }
 
          // render default child drag target 
          return (
            <div>
              <button onClick={props.onUploadPrompt}>Upload</button>
            </div>
          )
        }
        } />
    )
  }
}