export const getDeviceMetadata = async () => {
    const userAgent = navigator.userAgent;
    const language = navigator.language;
    const screenSize = {
        width: window.screen.width,
        height: window.screen.height,
    };
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // get IP address using a third-party service
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    const timestamp = new Date().toISOString();

    return {
        userAgent,
        language,
        screenSize,
        timeZone,
        ipAddress: ipData.ip,
        timestamp,
    }
}