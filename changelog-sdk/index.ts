import { SDK } from "./src/sdk";

// initialize the SDK
const sdk = new SDK({
  onSuccess: (data) => {
    console.log("Success callback", data);
  },
  onError: (error) => {
    console.error("Error callback", error);
  },
  onClose: () => {
    console.log("Close callback");
  },
  config: {
    // configuration options
  },
});
sdk.init();
