export type SDKOptions = {
  onClose: () => void;
  config: { tenantKey: string };
};

export class SDK {
  onClose!: SDKOptions["onClose"];
  config!: SDKOptions["config"];
  origin!: string;

  constructor({ onClose, config }: SDKOptions) {
    // singleton instance initialization
    if (!(this instanceof SDK)) {
      return new SDK({ onClose, config });
    }
    this.onClose = onClose;
    this.config = config;
    this.origin = "http://localhost:5173/changelogs"; // to be replaced with actual URL in production
  }

  init() {
    this.#openIframe();
    this.#addMessageListener();
  }

  // private method that opens the iframe with a provided URL
  #openIframe() {
    // create the modal backdrop
    const modalBackdrop = document.createElement("div");
    modalBackdrop.classList.add("sdk-modal-backdrop");
    modalBackdrop.style.position = "fixed";
    modalBackdrop.style.top = "0";
    modalBackdrop.style.left = "0";
    modalBackdrop.style.width = "100%";
    modalBackdrop.style.height = "100%";
    modalBackdrop.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
    modalBackdrop.style.zIndex = "9999";
    modalBackdrop.style.display = "flex";
    modalBackdrop.style.justifyContent = "center";
    modalBackdrop.style.alignItems = "center";

    // create modal container
    const modalContainer = document.createElement("div");
    modalContainer.style.borderRadius = "5px";
    modalContainer.style.position = "relative";
    modalContainer.style.width = "100%";
    modalContainer.style.height = "100%";

    // create loader element
    const loader = document.createElement("div");
    loader.textContent = "Loading...";
    loader.style.textAlign = "center";
    loader.style.padding = "20px";
    loader.style.fontWeight = "bold";
    loader.style.height = "100vh";
    loader.style.display = "flex";
    loader.style.alignItems = "center";
    loader.style.justifyContent = "center";

    // append loader to the modal container
    modalContainer.appendChild(loader);
    modalBackdrop.appendChild(modalContainer);
    document.body.appendChild(modalBackdrop);

    // create iframe element
    const iframe = document.createElement("iframe");
    iframe.src = this.origin;

    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";

    // when the iframe is loaded, send the config data to the iframe
    iframe.onload = () => {
      iframe.contentWindow?.postMessage({ type: "INIT" }, this.origin);

      // remove the loader and show the iframe
      modalContainer.removeChild(loader);
      modalContainer.appendChild(iframe);
      modalContainer.style.display = "block";
    };

    // handle iframe loading error
    iframe.onerror = (error) => {
      loader.style.color = "red";
      loader.textContent = "Error loading the data!";
      console.error(error);
      setTimeout(() => {
        this.#closeIframe();
      }, 3000);
    };
  }

  // private method that listens to messages from the iframe
  #addMessageListener() {
    window.addEventListener("message", (event) => {
      // check target origin for security
      if (event.origin !== this.origin) return;
      const { type, data } = event.data;
      switch (type) {
        case "WIDGET_READY":
          this.#sendIframeConfig(data);
          break;
        case "CLOSE":
          this.#closeIframe();
          this.onClose();
          break;
        default:
          break;
      }
    });
  }

  // private method that closes the iframe
  #closeIframe() {
    const modalBackdrop = document.querySelector(".sdk-modal-backdrop");
    if (modalBackdrop) {
      document.body.removeChild(modalBackdrop);
    }
  }

  // private method that sends a message to the iframe
  #sendIframeConfig(data: { tenantKey: string }) {
    const iframe = document.querySelector("iframe");
    if (iframe) {
      iframe.contentWindow?.postMessage({ type: "CONFIG", data }, this.origin);
    }
  }
}
