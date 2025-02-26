// export type SDKOptions = {
//   onClose: () => void;
//   // config: { tenantKey: string };
// };

export class SDK {
  onClose!: () => void;
  config!: { tenantKey: string; url: string };
  origin!: string;

  constructor(onClose: () => void, config: { tenantKey: string; url: string }) {
    // singleton instance initialization
    if (!(this instanceof SDK)) {
      return new SDK(onClose, config);
    }
    this.onClose = onClose;
    this.config = config;
    this.origin = "http://localhost:5174"; // to be replaced with actual widget URL in production
  }

  init() {
    this.#openIframe();
    this.#addMessageListener();
  }

  // private method that opens the iframe with a provided URL
  #openIframe() {
    // create or reference elements
    const modalBackdrop = document.createElement("div");
    const modalContainer = document.createElement("div");
    const iframe = document.createElement("iframe");
    const loader = document.createElement("div");
    loader.textContent = "Loading...";

    modalBackdrop.classList.add("sdk-modal-backdrop");
    modalBackdrop.style.position = "fixed";
    modalBackdrop.style.top = "0";
    modalBackdrop.style.left = "0";
    modalBackdrop.style.width = "100%";
    modalBackdrop.style.height = "100%";
    modalBackdrop.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
    modalBackdrop.style.zIndex = "9999";
    modalBackdrop.style.display = "flex";
    modalBackdrop.style.justifyContent = "center";
    modalBackdrop.style.alignItems = "center";

    modalContainer.style.borderRadius = "8px";
    modalContainer.style.position = "relative";
    modalContainer.style.background = "white";
    modalContainer.style.width = "400px";
    modalContainer.style.height = "600px";
    modalContainer.style.border = "none";
    modalContainer.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";

    loader.style.textAlign = "center";
    loader.style.padding = "20px";
    loader.style.fontWeight = "bold";
    loader.style.height = "100vh";
    loader.style.display = "flex";
    loader.style.alignItems = "center";
    loader.style.justifyContent = "center";

    // append loader to the modal container
    if (!modalContainer.contains(loader)) {
      modalContainer.appendChild(loader);
    }
    modalBackdrop.appendChild(modalContainer);
    document.body.appendChild(modalBackdrop);

    // attach event listeners before setting iframe.src
    iframe.addEventListener("load", () => {
      if (iframe.contentWindow) {
        try {
          this.#sendIframeConfig({
            tenantKey: this.config.tenantKey,
            url: this.config.url,
          });
          // iframe.contentWindow?.postMessage(
          //   { type: "INIT", data: this.config },
          //   this.origin
          // );
        } catch (error) {
          console.log("Error posting message to iframe:", error);
        }
      } else {
        console.log("iframe.contentWindow is not available");
      }
    });
    // remove loader
    if (modalContainer.contains(loader)) {
      modalContainer.removeChild(loader);
    }
    // append iframe element
    if (!modalContainer.contains(iframe)) {
      modalContainer.appendChild(iframe);
    }
    modalContainer.style.display = "block";
    // handle iframe load error
    iframe.addEventListener("error", (event) => {
      loader.style.color = "red";
      loader.textContent = "Error loading the data!";
      console.log("error loading iframe:", event);
      setTimeout(() => {
        this.#closeIframe();
      }, 3000);
    });
    // set iframe src and style
    iframe.src = this.origin;
    iframe.id = "changelog-widget";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
  }

  // private method that listens to messages from the iframe
  #addMessageListener() {
    window.addEventListener("message", (event) => {
      // check target origin for security
      if (event.origin !== this.origin) return;
      const { type } = event.data;
      if (type === "CLOSE") this.#closeIframe();
    });
  }

  // private method that closes the iframe
  #closeIframe() {
    this.onClose();
    const modalBackdrop = document.querySelector(".sdk-modal-backdrop");
    if (modalBackdrop) {
      document.body.removeChild(modalBackdrop);
    }
  }

  // private method that sends a message to the iframe
  #sendIframeConfig(data: { tenantKey: string; url: string }) {
    const iframe = document.querySelector("iframe");
    if (iframe) {
      iframe.contentWindow?.postMessage({ type: "INIT", data }, this.origin);
    }
  }
}
