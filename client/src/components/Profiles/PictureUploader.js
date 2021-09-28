import React from "react";
import $ from "jquery";
import { UPDATE_IMAGE } from "../../utils/mutation";
import { useMutation } from "@apollo/react-hooks";

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

    formData.append("image", this.state.picture);

    $.ajax({
      url: "https://api.imgur.com/3/image",
      type: "POST",
      data: formData,
      headers: {
        Authorization: "Client-ID 3bd0a7ed5554183 ",
      },
      success: function (response) {
        // Code to handle a succesfull upload
        console.log(response.data.link);
      },

      cache: false,
      contentType: false,
      processData: false,
    });

    // var uploadedImage = response.data.link;
  }

  render() {
    return (
      <div>
        <h5>Picture Uploader</h5>

        <input type="file" onChange={this.handlePictureSelected.bind(this)} />
        <br />
        <div>{this.renderPreview()}</div>
        <hr />
        <button onClick={this.upload.bind(this)}>Upload</button>
      </div>
    );
  }
}
