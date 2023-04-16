import { openUploadWidget } from "../../utils/CloudinaryService";

const CloudinaryImage = (props) => {
  const uploadImageWidget = async () => {
    let myUploadWidget = await openUploadWidget(
      {
        cloudName: props.cloud_name,
        uploadPreset: props.upload_preset,
        tags: ["myname"],
        // maxImageWidth: 600,
        sources: ["local", "url", "camera"],
      },
      function (error, result) {
        if (!error && result.event === "success") {
          props.onImageUpload(result.info.public_id);
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <button
      className="px-4 py-2 text-black bg-secondary rounded hover:bg-brand-yellow"
      onClick={uploadImageWidget}
    >
      UPLOAD IMAGE
    </button>
  );
};

export default CloudinaryImage;
