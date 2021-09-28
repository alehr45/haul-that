import React from "react";
import $ from "jquery";

export default class PictureUploader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      picture: false,
      src: false,
    };
  }

  handlePictureSelected(event) {
    var picture = event.target.files[0];
    var src = URL.createObjectURL(picture);

    this.setState({
      picture: picture,
      src: src,
    });
  }

  renderPreview() {
    if (this.state.src) {
      return <img src={this.state.src} />;
    } else {
      return <p>No Preview</p>;
    }
  }

  upload() {
    var formData = new FormData();

    formData.append("file", this.state.picture);

    $.ajax({
      url: "https://api.imgur.com/3/image",
      type: "POST",
      // datatype: "json",
      data: formData,
      // headers: {
      //   Authorization: "Client-ID d05e445a9bc224b ",
      // },
      success: function (response) {
        // Code to handle a succesful upload
        console.log(response);
      },
      cache: false,
      contentType: false,
      processData: false,
    });
  }

  render() {
    return (
      <div>
        <h5>Picture Uploader</h5>

        <input
          className="uploadimage"
          type="file"
          onChange={this.handlePictureSelected.bind(this)}
        />
        <br />
        <div>{this.renderPreview()}</div>
        <hr />
        <button onClick={this.upload.bind(this)}>Upload</button>
      </div>
    );
  }
}
