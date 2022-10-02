import { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/create");
  }, [router]);

  return null;
};

export default Home;
