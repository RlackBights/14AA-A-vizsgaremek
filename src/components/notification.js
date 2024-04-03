let timeoutInfo;

export function displayMessage(message, type = "notification") {
    const messageElement = document.getElementById("notification");
    messageElement.innerHTML = message;
    console.log(timeoutInfo !== undefined);
    if (timeoutInfo !== undefined) {
        messageElement.className = "";
        clearTimeout(timeoutInfo);
    }
    messageElement.className = (type === "error") ? "show show-error" : "show show-notification";
    timeoutInfo = setTimeout(() => {
        messageElement.className = "";
    }, 4000);
}

export function Notification() {
    return (
        <p id="notification"></p>
    )
}