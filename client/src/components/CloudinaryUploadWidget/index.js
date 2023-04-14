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

  return (
    <div className="App">
      <CloudinaryImage cloud_name={cld.cloudinaryConfig.cloud.cloud_name} upload_preset={cld.cloudinaryConfig.cloud.upload_preset} onImageUpload={(publicId) => onImageUploadHandler(publicId)} />
      <div className="col-12 col-md-10 my-3"></div>
    </div>
  );
}

export default CloudinaryUploadWidget;
