"use client";
import React, { useState } from "react";
import { app, database } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  query,
  where,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { AiOutlineFileAdd } from "react-icons/ai";
const Retrive = () => {
  const [obj, setObj] = useState();
  const [data, setdata] = useState(0);
  const [text, settext] = useState("");
  const [load, setLoad] = useState(false);
  const collectionRef = collection(database, "users_data");
  const getData = async (key) => {
    setLoad(true);
    const documentRef = doc(database, "users_data", key.toString());
    const documentSnapshot = await getDoc(documentRef);
    try {
      const documentSnapshot = await getDoc(documentRef);
      if (documentSnapshot.exists()) {
        const data = documentSnapshot.data();
        console.log("Document data:", data);
        settext(data.text);
        setLoad(false);
      } else {
        console.log("Document does not exist.");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
    try {
      await deleteDoc(documentRef);
      console.log("Document deleted successfully.");
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };
  return (
    <div className="max-w-6xl mx-auto mt-4 pb-6">
      <div className="flex space-x-6">
        <input
          type="text"
          placeholder="Enter code"
          className="flex-1 h-10 bg-transparent border-b-2 border-blue-300 indent-2 outline-none"
          onChange={(e) => setdata(e.target.value)}
        />
        <button
          onClick={() => getData(data)}
          className="font-semibold text-xs text-blue-400"
        >
          Get
        </button>
      </div>
      <div className="min-h-screen mt-6 pt-6 px-5 rounded-3xl bg-gray-100 w-full flex pb-6 relative">
        {load ? (
          <img
            src="/loading.svg"
            alt=""
            height="100px"
            width="100px"
            className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]"
          />
        ) : (
          ""
        )}
        <span>{text}</span>
      </div>
    </div>
  );
};

export default Retrive;
