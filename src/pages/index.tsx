import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

import io from "socket.io-client";
import { useEffect, useState } from "react";
let socket;

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [input, setInput] = useState("");
  useEffect(() => {
    async function socketInitializer() {
      await fetch("/api/socket");
      socket = io();

      socket.on("connect", () => {
        console.log("connected");
      });
      socket.on("update-input", (msg) => {
        setInput(msg);
      });
    }
    socketInitializer();
  }, []);

  const onChangeHandler = (e) => {
    setInput(e.target.value);
    socket.emit("input-change", e.target.value);
  };

  return (
    <>
      <h2>chat app</h2>
      <input type="text" onChange={onChangeHandler} value={input}></input>
    </>
  );
}
