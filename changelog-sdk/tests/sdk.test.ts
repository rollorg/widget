/**
 * @jest-environment jsdom
 */

import { SDK } from "../src/sdk";

describe("SDK", () => {
  let sdk: SDK;
  const sdkOptions = {
    onClose: jest.fn(),
    config: { tenantKey: "test-tenant", url: "http://my-url.com" },
  };

  beforeEach(() => {
    // Clear the document body before each test
    document.body.innerHTML = "";
    // Create a new instance of the SDK
    sdk = new SDK(sdkOptions.onClose, sdkOptions.config);
    // For testing, override the origin to a fixed value
    sdk.origin = "http://localhost";
  });

  test("init() should append a modal backdrop to the document", () => {
    sdk.init();
    const modal = document.querySelector(".sdk-modal-backdrop");
    expect(modal).not.toBeNull();
  });

  test("should handle a CLOSE message from the widget", () => {
    sdk.init();

    // Simulate receiving a postMessage event from the widget
    const messageEvent = new MessageEvent("message", {
      origin: sdk.origin,
      data: {
        type: "CLOSE",
      },
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
      expect(postMessageSpy).not.toHaveBeenCalledWith(
        {
          type: "CLOSE",
          data: { tenantKey: "test-tenant", url: "http://my-url.com" },
        },
        sdk.origin
      );

      expect(postMessageSpy).toHaveBeenCalledWith(
        {
          type: "CLOSE",
        },
        sdk.origin
      );
      postMessageSpy.mockRestore();
    }
  });
});
