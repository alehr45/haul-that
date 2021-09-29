import React, { useState } from "react";
import $ from "jquery";
import { QUERY_ME_BASIC } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { UPDATE_USER } from "../../utils/mutation";

const PictureUploader = (props) => {
  const [updateUser] = useMutation(UPDATE_USER);
  const { loading: userLoading, data } = useQuery(QUERY_ME_BASIC);
  const [picture, setPicture] = useState(false);
  const [src, setSRC] = useState(false);
  let user = {};

  if (!userLoading) {
    user = data.me;
    console.log(user);
  }

  const handlePictureSelected = (event) => {
    var picture = event.target.files[0];
    var src = URL.createObjectURL(picture);

    setPicture(picture);
    setSRC(src);
  };

  const renderPreview = () => {
    if (src) {
      return <img src={src} />;
    } else {
      return <p>No Preview</p>;
    }
  };

  const upload = () => {
    var formData = new FormData();

    formData.append("image", picture);

    $.ajax({
      url: "https://api.imgur.com/3/image",
      type: "POST",
      data: formData,
      headers: {
        Authorization: "Client-ID 3bd0a7ed5554183",
      },
      success: function (response) {
        // Code to handle a succesfull upload
        console.log(response.data.link);
       
      },
      
      cache: false,
      contentType: false,
      processData: false,
      updateUser({
        variables: { _id: user._id, image: response.data.link },
      });
    });
  };

  return (
    <div>
      <h5>Picture Uploader</h5>

      <input type="file" onChange={handlePictureSelected} />
      <br />
      <div>{renderPreview()}</div>
      <hr />
      <button onClick={upload}>Upload</button>
    </div>
  );
};

export default PictureUploader;
