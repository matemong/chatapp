import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

import io from "socket.io-client";
import { useEffect } from "react";
let socket;

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useEffect(() => {
    async function socketInitializer() {
      await fetch("/api/socket");
      socket = io();

      socket.on("connect", () => {
        console.log("connected");
      });
    }
    socketInitializer();
  }, []);

  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}
