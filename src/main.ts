import "normalize.css/normalize.css";
import App from "./App.svelte";

let root = document.getElementById("root");
if (!root) {
    root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);
}

const app = new App({
    target: root,
});

export default app;
