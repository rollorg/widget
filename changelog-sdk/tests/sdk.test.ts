/**
 * @jest-environment jsdom
 */

import { SDK, SDKOptions } from "../src/sdk";

describe("SDK", () => {
  let sdk: SDK;
  const sdkOptions: SDKOptions = {
    onClose: jest.fn(),
    config: { tenantKey: "test-tenant" },
  };

  beforeEach(() => {
    // Clear the document body before each test
    document.body.innerHTML = "";
    // Create a new instance of the SDK
    sdk = new SDK(sdkOptions);
    // For testing, override the origin to a fixed value
    sdk.origin = "http://localhost";
  });

  test("init() should append a modal backdrop to the document", () => {
    sdk.init();
    const modal = document.querySelector(".sdk-modal-backdrop");
    expect(modal).not.toBeNull();
  });

  test("should handle a WIDGET_READY message from the widget", () => {
    sdk.init();

    // Simulate receiving a postMessage event from the widget
    const messageEvent = new MessageEvent("message", {
      origin: sdk.origin,
      data: { type: "WIDGET_READY", data: { tenantKey: "test-tenant" } },
    });
    window.dispatchEvent(messageEvent);

    // Since #sendIframeConfig is a private method, you might not directly test its internal behavior.
    // Instead, verify side effects, such as whether postMessage is sent from the iframe.
    // For a more advanced test, you can spy on iframe.contentWindow.postMessage.

    // For example:
    const iframe = document.querySelector("iframe") as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      const postMessageSpy = jest.spyOn(iframe.contentWindow, "postMessage");
      // Dispatch the event again so that the listener calls #sendIframeConfig
      window.dispatchEvent(messageEvent);
      expect(postMessageSpy).toHaveBeenCalledWith(
        { type: "CONFIG", data: { tenantKey: "test-tenant" } },
        sdk.origin
      );
      postMessageSpy.mockRestore();
    }
  });
});
