import React, {Component} from 'react';
import ReactAvatarEditor from 'react-avatar-editor';
import {cancelEventAndRun} from '../lib/eventHelpers';
import faceMask from '../assets/images/face-mask-feathered.png';
import * as faceService from '../lib/faceService';

class Editor extends Component {
  state = {
      scale: 1
  }

  setEditorRef = (editor) => {
    if (editor) this.editor = editor;
  }

  setMaskRef = (mask) => {
    if(mask) this.mask = mask;
  }

  handleScale = (e) => {
    const scale = parseFloat(e.target.value);
    this.setState({scale});
  }

  handleSave = () => {
    let editorImage = this.editor.getImageScaledToCanvas();
    let grayImage = faceService.grayscaleFace(editorImage);
    let contrastImage = faceService.contrastFace(grayImage, 10);
    let colorizedImage = faceService.colorizeFace(contrastImage, "#543b06");
    let maskedImage = faceService.maskFace(colorizedImage, this.mask);

    this.props.onConfirmClick(maskedImage);
  }

  handleCancel = () => {
    this.props.onCancelClick();
  }

  render() {
    return (
      <section className="layer layer--editor xs-z2">
        <div className="layer__body editor xs-relative">
          <div className="editor__preview xs-relative">
            <ReactAvatarEditor
              ref={this.setEditorRef}
              image={this.props.faceSrcURL}
              width={320}
              height={320}
              border={0}
              borderRadius={0}
              scale={parseFloat(this.state.scale)}
            />
            <img ref={this.setMaskRef} src={faceMask} width="320px" height="320px" alt="mask"
              className="editor__mask"/>
          </div>
          <div className="editor__controls">
            <input
              name="scale"
              type="range"
              onChange={this.handleScale}
              min="1"
              max="8"
              step="0.01"
              defaultValue="1"
              />
          </div>
          <div className="editor__actions clearfix">
          <a href="#"
            onClick={cancelEventAndRun(this.handleCancel)}
            className="editor__cancel button button--secondary button--block xs-float-left">Cancel</a>
          <a href="#"
            onClick={cancelEventAndRun(this.handleSave)}
            className="editor__confirm button button--primary button--block xs-float-right">Use Face</a>
            </div>
        </div>
      </section>
    );
  }
}

Editor.propTypes = {
  onConfirmClick: React.PropTypes.func,
  onCloseClick: React.PropTypes.func,
  faceSrcURL: React.PropTypes.string
}

export default Editor;
