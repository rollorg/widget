import { SDK } from "./src/sdk";

// initialize the SDK
const sdk = new SDK({
  onError: (error) => {
    console.error("Error callback", error);
  },
  onClose: () => {
    console.log("Close callback");
  },
  config: {
    url: "http://localhost:5173/changelogs",
    tenantKey: "new_org_fyevB",
  },
});
sdk.init();
