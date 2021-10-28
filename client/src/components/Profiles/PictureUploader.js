import React, { useState, useRef } from "react";
import $ from "jquery";
import { Button, Form, Input, Label } from "react-bootstrap";
import { QUERY_ME_BASIC } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { UPDATE_USER, UPDATE_IMAGE } from "../../utils/mutation";

const PictureUploader = ({ type, setImage }) => {
  const inputRef = useRef();
  const [updateUser] = useMutation(UPDATE_USER);
  const [updateImage] = useMutation(UPDATE_IMAGE);
  const { loading: userLoading, data } = useQuery(QUERY_ME_BASIC);
  // const [picture, setPicture] = useState(false);
  const [src, setSRC] = useState(false);
  let user = {};
  let picture = "";

  if (!userLoading) {
    user = data.me;
  }

  const handlePictureSelected = async (event) => {
    picture = event.target.files[0];
    var src = URL.createObjectURL(picture);

    // setPicture(picture);
    setSRC(src);
    upload();
  };

  const renderPreview = () => {
    if (src) {
      return (
        <img
          height="auto"
          width="150
      "
          src={src}
        />
      );
    } else {
      return;
    }
  };

  const check = () => {
    inputRef.current.addEventListener("load", setRef);
  };

  const setRef = () => {
    console.log(inputRef);
  };

  const upload = () => {
    check();
    inputRef.current?.click();
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

        if (type === "job") {
          setImage(response.data.link);
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

  const handleUpload = () => {
    inputRef.current?.click();
  };

  return (
    <div className="m-3">
      <input
        ref={inputRef}
        type="file"
        className="d-none"
        onChange={handlePictureSelected}
      />
      <button className="btn btn-outline-primary" onClick={handleUpload}>
        <div>{renderPreview()}</div>
        Add Profile Image
      </button>
    </div>
  );
};

export default PictureUploader;
