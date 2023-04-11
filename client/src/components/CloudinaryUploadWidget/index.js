import { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import CloudinaryImage from "../CloudinaryImage";

function CloudinaryUploadWidget() {
  const [imagesUploadedList, setImagesUploadedList] = useState([]);

  const cld = new Cloudinary({
    cloud: {
      cloud_name: "drlulo3bd", //Your cloud name
      upload_preset: "pos_images", //Create an unsigned upload preset and update this
    },
  });

  const onImageUploadHandler = async (publicId) => {
    await setImagesUploadedList((prevState) => [...prevState, publicId]);
    // ADD grab image tag to set dataID to publicId
    document.getElementsByTagName("img")[0].setAttribute("data-id", publicId);
    document.getElementsByTagName("img")[0].setAttribute("src", `https://res.cloudinary.com/drlulo3bd/image/upload/v1681173535/${publicId}`);
  };

  const deleteAllImages = async () => {
    try {
      //You can call an API in your backend if you want to delete images.
      //This is the API you should call:
      //https://cloudinary.com/documentation/image_upload_api_reference#destroy
      // const responseData = await fetch(
      //   "http://localhost:5000/api/photos/delete"
      // );
      setImagesUploadedList([]);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="App">
      <button className="redButton" onClick={deleteAllImages}>
        Delete all images
      </button>
      <CloudinaryImage cloud_name={cld.cloudinaryConfig.cloud.cloud_name} upload_preset={cld.cloudinaryConfig.cloud.upload_preset} onImageUpload={(publicId) => onImageUploadHandler(publicId)} />
      <p>This mini project demonstrates the use of Upload widget + transformations on uploaded images in responsive way useing hooks in React</p>
      <div className="col-12 col-md-10 my-3"></div>
    </div>
  );
}

export default CloudinaryUploadWidget;
