import React, { useState } from "react";
import $ from "jquery";
import { UPDATE_USER } from "../../utils/mutation";
// import { QUERY_ME_BASIC } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/react-hooks";

const PictureUploader = (user) => {
  // const { loading: userLoading, data } = useQuery(QUERY_ME_BASIC);
  const [updateUser] = useMutation(UPDATE_USER);
  const [picture, setPicture] = useState("");
  const [src, setSRC] = useState("");
  const [newImage, setNewImage] = useState(user.image);
  console.log(picture.name, picture)
  // if (!userLoading) {
  //   user = data.me;
  //   console.log(user);
  // }

  const handlePictureSelected = (event) => {
    var picture = event.target.files[0];
    var src = URL.createObjectURL(picture);
    setPicture(picture);
    setSRC(src);
  }

  // const renderPreview = () => {
  //   if (src) {
  //     return <img src={src} />;
  //   } else {
  //     return <p>No Preview</p>;
  //   }
  // }

  const upload = (event) => {
    var formData = new FormData();
    formData.append("image", picture);

    $.ajax({
      url: "https://api.imgur.com/3/image/",
      type: "POST",
      data: formData,
      headers: {
        Authorization: "Client-ID b186c5a61203c69",
      },
      success: function (response) {
        // Code to handle a succesfull upload
        console.log(response);        
      },
      cache: false,
      contentType: false,
      processData: false,
    });
  }
  
  // const updateUserImage = async () => {
    // await updateUser({
    //   variables: { newImage, _id: user._id },
    // });
  // }

  return (
    <div>
      <h5>Picture Uploader</h5>

      <input type="file" onChange={handlePictureSelected} />
      <br />
      {/* <div>{renderPreview()}</div> */}
      <hr />
      <button onClick={() => {
        upload()
        // updateUserImage()
        }}>Upload</button>
    </div>
  );
}

export default PictureUploader;