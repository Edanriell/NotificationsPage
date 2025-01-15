/* @refresh reload */
import { render } from "solid-js/web";

import { Routes } from "./routes";

import "./styles/styles.less";

const root = document.getElementById("root");

render(() => <Routes />, root!);
