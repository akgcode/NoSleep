const awakeText = "  Device will stay awake.";
const sleepText = "  Prevent device from sleeping";
const btn = document.getElementById("preventSleepSwitch")
const update = document.getElementById("awakeText");
update.textContent = sleepText;
let wakeLock = null;

  async function requestWakeLock() {
    try {
      console.log("requestedWakeLock");
      wakeLock = await navigator.wakeLock.request("screen");
      update.textContent = sleepText;

    } catch (err) {
        update.textContent = `Error: ${err}`;
      }
    }
  
  
  async function releaseWakeLock() {
    try {
      if (wakeLock) {
        await wakeLock.release();
        console.log("releaseWakeLock");
        wakeLock = null;
        btn.checked = false;
      }
      update.textContent = awakeText;
    } catch (err) {
      update.textContent = `Error: ${err}`;
    }
  }

if ("wakeLock" in navigator) {
  isSupported = true;
  console.log("intiated wakeLock");
  // initiateWakeLock();
} else {
  wakeButton.disabled = true;
  document.getElementById("awakeText").textContent = "Wake lock is not supported by this browser.";
}
 
btn.addEventListener("click", async () => {
	if (wakeLock) {
		await releaseWakeLock();
	} else {
		await requestWakeLock();
	}
});

document.addEventListener("visibilitychange", async () => {
	if (document.visibilityState === "hidden" && wakeLock) {
		await releaseWakeLock();
	} else if (document.visibilityState === "visible") {
		await requestWakeLock();
	}
});

requestWakeLock();
