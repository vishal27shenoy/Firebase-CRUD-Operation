"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { app, database } from "../firebaseConfig";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { AiOutlineFileAdd } from "react-icons/ai";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

const Upload = () => {
  const collectionRef = collection(database, "users_data");
  const storage = getStorage();
  const [upload, setUpload] = useState(false);
  const [dataText, setDataText] = useState({ text: "", key: "" });
  const [task, setTask] = useState("text");
  const inputRef = useRef(null);
  const [imgsrc, setimgsrc] = useState("");
  const [ImgUpload, setImgUpload] = useState();
  const [random, setRandom] = useState(0);
  const [Url, seturl] = useState("");
  const TriggerInput = () => {
    inputRef.current.click();
    console.log(inputRef);
  };
  const handleImg = (e) => {
    console.log(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState == 2) {
        setimgsrc(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setImgUpload(e.target.files[0]);
  };
  const handleSubmit = async () => {
    const val = Math.floor(1000 + Math.random() * 9000);
    setRandom(val);
    console.log(dataText, val);
    setDataText({
      ...dataText,
      key: val,
    });
    if (dataText.text && val) {
      setDoc(doc(database, "users_data", val.toString()), {
        text: dataText.text,
        key: val,
      })
        .then(() => {})
        .catch((err) => {
          alert(err.message);
        });
    }
    setDataText({ text: "" });
  };
  const uploadImage = () => {
    const imageRef = ref(storage, `image/${ImgUpload.name}`);

    try {
      // Upload the file
      const uploadTask = uploadBytesResumable(imageRef, ImgUpload);

      // Get the download URL
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Error uploading file:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log("File URL:", downloadURL);
              seturl(downloadURL);
              // You can use the downloadURL to access the uploaded file
            })
            .catch((error) => {
              console.error("Error getting download URL:", error);
            });
        }
      );
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    const val = Math.floor(1000 + Math.random() * 9000);
    setRandom(val);
    console.log(Url, val);

    if (Url && val) {
      console.log("hello");
      setDoc(doc(database, "users_data", val.toString()), {
        text: Url,
        key: val,
      })
        .then(() => {})
        .catch((err) => {
          alert(err.message);
        });
    }
  };
  return (
    <div className="bg-gray-200 min-h-full mt-36 max-w-6xl mx-auto flex items-center">
      {task == "files" ? (
        <div className="h-80 w-[500px]  border order-2 ml-auto mr-32">
          <p className="text-blue-500 text-xs">Preview</p>
          <img
            src={imgsrc}
            alt=""
            border="0"
            className="aspect-video h-80 object-contain"
          />
        </div>
      ) : (
        ""
      )}
      <div className="flex flex-col h-[100%]">
        <div className="h-auto flex flex-col  w-fit border-4  ml-20  space-y-4">
          <div className="flex space-x-2">
            <span
              onClick={() => setTask("files")}
              className="h-12 w-32 flex items-center justify-center font-bold bg-blue-400 p-3 text-white border rounded-lg"
            >
              File / Image
            </span>
            <span
              onClick={() => setTask("text")}
              className="h-12 w-32 flex items-center justify-center font-bold bg-gray-400 p-3 text-white border rounded-lg"
            >
              Text
            </span>
          </div>
          {task == "text" ? (
            <textarea
              value={dataText.text}
              className="w-96 h-52 rounded-md focus:outline-none resize-none rounded-xl indent-2 text-xs pt-2 "
              placeholder="Enter your text"
              onChange={(e) => setDataText({ text: e.target.value })}
            ></textarea>
          ) : (
            <div className="w-96 h-52 rounded-lg bg-white flex items-center justify-center">
              <input
                type="file"
                hidden
                ref={inputRef}
                onChange={(e) => handleImg(e)}
              />
              <span
                className="h-24 w-24 flex items-center justify-center text-white text-lg rounded-full bg-blue-500 hover:shadow-lg"
                onClick={TriggerInput}
              >
                <AiOutlineFileAdd className="h-12 w-12" />
              </span>
            </div>
          )}
          <button
            className="h-10 bg-blue-400 font-semibold text-white rounded-lg"
            onClick={task == "text" ? handleSubmit : uploadImage}
          >
            submit
          </button>
          Your Key is : {random != 0 ? random : ""}
        </div>
      </div>
    </div>
  );
};

export default Upload;
