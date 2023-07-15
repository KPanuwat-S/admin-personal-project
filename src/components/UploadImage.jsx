import React, { useState } from "react";
import assets from "../assets/assets.gif";
import axios from "axios";
function UploadImage({ url, setUrl }) {
  const [loading, setLoading] = useState(false);
  // const [url, setUrl] = useState([]);
  const [file, setFile] = useState("");

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadImage = async (event) => {
    const files = event.target.files;
    console.log(files.length);

    if (files.length === 1) {
      setFile(files[0]);

      const base64 = await convertBase64(files[0]);
      uploadSingleImage(base64);
      setFile("");
      return;
    }

    const base64s = [];
    for (var i = 0; i < files.length; i++) {
      var base = await convertBase64(files[i]);
      base64s.push(base);
    }
    uploadMultipleImages(base64s);
  };

  function uploadSingleImage(base64) {
    setLoading(true);
    axios
      .post("http://localhost:8001/admin/images", {
        image: base64,
      })
      .then((res) => {
        setUrl((prev) => {
          // const prevUrl = [...prev];
          return [...prev, res.data];
        });
        // alert("Image uploaded Succesfully");
      })
      .then(() => {
        console.log("url", url);
        setLoading(false);
      })
      .catch(console.log);
  }

  function uploadMultipleImages(image) {
    setLoading(true);
    axios
      .post("http://localhost:8001/admin/images", { image })
      .then((res) => {
        setUrl(res.data);
        alert("Image uploaded Succesfully");
      })
      .then(() => setLoading(false))
      .catch(console.log);
  }

  function UploadInput() {
    if (url.length >= 3) return;
    return (
      <div className="flex w-[60px] items-center justify-center">
        <label
          htmlFor="dropzone-file"
          className="h-8 flex flex-col items-center justify-center w-full border border-gray-300 border-dashed rounded-lg cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            {/* <p className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span>
            </p> */}
          </div>
          <input
            onChange={uploadImage}
            id="dropzone-file"
            type="file"
            className="hidden"
            multiple
          />
        </label>
      </div>
    );
  }
  function RemoveInput() {
    return (
      <div className="flex w-[60px] items-center justify-center">
        <div
          onClick={() => {
            setUrl([]);
          }}
          htmlFor="dropzone-file"
          className="h-8 flex flex-col items-center justify-center w-full border rounded-lg cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center">
            <i class="fa-solid fa-trash-arrow-up text-gray-400"></i>
            {/* <p className="text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold">Click to upload</span>
        </p> */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center flex-col m-8 ">
      <div className="flex items-center justify-between mb-5 ">
        <h2 className="tracking-tight font-semibold text-center text-gray-900 dark:text-white">
          Product Photos
        </h2>
        <div className="flex items-center gap-5">
          <RemoveInput />
          <UploadInput />
        </div>
      </div>
      <div className="mb-2 text-gray-400">Max pics: {url.length}/3</div>
      <div>
        {loading ? (
          <div className="flex items-center justify-center w-full bg-gray-100 rounded-xl h-[120px]">
            <div className="w-[60px]">
              {" "}
              <svg
                version="1.1"
                id="L5"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 100 100"
                enable-background="new 0 0 0 0"
                xml:space="preserve"
              >
                <circle fill="#999" stroke="none" cx="6" cy="50" r="6">
                  <animateTransform
                    attributeName="transform"
                    dur="1s"
                    type="translate"
                    values="0 15 ; 0 -15; 0 15"
                    repeatCount="indefinite"
                    begin="0.1"
                  />
                </circle>
                <circle fill="#555" stroke="none" cx="30" cy="50" r="6">
                  <animateTransform
                    attributeName="transform"
                    dur="1s"
                    type="translate"
                    values="0 10 ; 0 -10; 0 10"
                    repeatCount="indefinite"
                    begin="0.2"
                  />
                </circle>
                <circle fill="#111" stroke="none" cx="54" cy="50" r="6">
                  <animateTransform
                    attributeName="transform"
                    dur="1s"
                    type="translate"
                    values="0 5 ; 0 -5; 0 5"
                    repeatCount="indefinite"
                    begin="0.3"
                  />
                </circle>
              </svg>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex gap-2 mb-5">
              {url.length > 0 ? (
                url.map((el) => {
                  return (
                    <div className="w-[120px]">
                      <img src={el} alt="" />
                    </div>
                  );
                })
              ) : (
                <div className="flex items-center justify-center w-full bg-gray-100 rounded-xl h-[120px]">
                  <i class="fa-regular fa-image text-gray-200 fa-2xl"></i>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadImage;
