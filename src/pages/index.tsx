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
    <div className="flex flex-col w-full h-screen">
      <div className="py-4 text-accent-focus bg-primary-content sticky top-0">
        <h2 className="text-center text-2xl font-semibold">chat app</h2>
      </div>
      <div className="flex flex-col flex-1 bg-neutral-content">
        <div className="flex-1 p-4">
          
            <div className="text-sm text-center text-info py-6">
              No chat messages
            </div>

        </div>
        <div className="bg-primary-content p-4 h-20 sticky bottom-0">
          <div className="flex flex-row flex-1 h-full divide-gray-200 divide-x">
            <div className="pr-2 flex-1">
              <input
                type="text"
                className="w-full text-primary-content bg-primary-focus input input-bordered h-full"
              />
            </div>
            <div className="flex flex-col justify-center items-stretch pl-2">
              <button
                className="btn btn-primary"
              >
                send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
