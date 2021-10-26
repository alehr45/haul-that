import React, { useState } from "react";
import $ from "jquery";
import { Button, Form } from "react-bootstrap";
import { QUERY_ME_BASIC } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { UPDATE_USER, UPDATE_IMAGE } from "../../utils/mutation";

const PictureUploader = ({type, setImage}) => {
  const [updateUser] = useMutation(UPDATE_USER);
  const [updateImage] = useMutation(UPDATE_IMAGE);
  const { loading: userLoading, data } = useQuery(QUERY_ME_BASIC);
  // const [picture, setPicture] = useState(false);
  const [src, setSRC] = useState(false);
  let user = {};
  let picture = ""

  if (!userLoading) {
    user = data.me;
    console.log(user);
  }

  const handlePictureSelected = async (event) => {
    picture = event.target.files[0];
    var src = URL.createObjectURL(picture);

    // setPicture(picture);
    setSRC(src);
    upload()
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
    var result = null;
    $.ajax({
      url: "https://api.imgur.com/3/image",

      type: "POST",
      data: formData,
      headers: {
        Authorization: "Client-ID 3bd0a7ed5554183",
      },
      cache: false,
      contentType: false,
      processData: false,
      async: false,
      success: function (response) {
        result = data;
        console.log(response.data.link);

        if (type==="job") {
          setImage(response.data.link)
        } else {
          updateImage({
            variables: { image: response.data.link, _id: user._id },
          });
        }

        // Code to handle a succesfull upload
      },
    });
    return result;
  };

  return (
    <div>
      <Form.Group controlId="formFileSm" className="mb-3">
        <Form.Control type="file" onChange={handlePictureSelected} />
      </Form.Group>
      {/* <Button onClick={upload}>Upload</Button> */}
    </div>
  );
};

export default PictureUploader;