export type SDKOptions = {
  onError: (error: Error) => void;
  onClose: () => void;
  config: {url: string, tenantKey: string};
};

export class SDK {
  onError!: SDKOptions["onError"];
  onClose!: SDKOptions["onClose"];
  config!: SDKOptions["config"];

  constructor({ onError, onClose, config }: SDKOptions) {
    // singleton instance initialization
    if (!(this instanceof SDK)) {
      return new SDK({ onError, onClose, config });
    }
    this.onError = onError;
    this.onClose = onClose;
    this.config = config;
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
    loader.style.color = "white";
    loader.style.height = "100vh";
    loader.style.display = "flex";
    loader.style.alignItems = "center";
    loader.style.justifyContent = "center";

    modalContainer.appendChild(loader);
    modalBackdrop.appendChild(modalContainer);
    document.body.appendChild(modalBackdrop);

    // create iframe element
    const iframe = document.createElement("iframe");
    // iframe.src = this.config.url;
    iframe.src = "http://localhost:5173/changelogs";

    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";

    // when the iframe is loaded, send the config data to the iframe
    iframe.onload = () => {
      iframe.contentWindow?.postMessage(
        { type: "INIT", config: this.config },
        `${process.env.TARGET_ORIGIN}`
      );

      // remove the loader and show the iframe
      modalContainer.removeChild(loader);
      modalContainer.appendChild(iframe);
      modalContainer.style.display = "block";
    };

    // handle iframe loading error
    iframe.onerror = (error) => {
      loader.textContent = "Error loading the iframe";
      console.error(error);
      setTimeout(() => {
        this.#closeIframe();
      }, 2000);
    };
  }

  // private method that listens to messages from the iframe
  #addMessageListener() {
    window.addEventListener("message", (event) => {
      // check event origin
      if (event.origin !== process.env.TARGET_ORIGIN) {
        return;
      }

      if (event.data?.type === "CLOSE") {
        this.#closeIframe();
      }
    });
  }

  // private method that closes the iframe
  #closeIframe() {
    // remove the modal backdrop
    const modalBackdrop = document.querySelector(".sdk-modal-backdrop");
    if (modalBackdrop) {
      document.body.removeChild(modalBackdrop);
    }
  }

  sendToHost(data: any) {
    window.parent.postMessage(data, "*");
  }
}
