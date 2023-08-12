document.addEventListener("DOMContentLoaded", function() {
    const slots = document.querySelectorAll(".slot");

    let slotsWithTimer = 0; // To keep track of slots with timers

    slots.forEach(slot => {
        if (slot.classList.contains("occupied")) {
            let timeLeftInMinutes = Math.floor(Math.random() * (180 - 1) + 1); // Random time from 1 min to 3 hours
            if (slotsWithTimer < 2) {
                timeLeftInMinutes = 0.3; // Set to 1 minute (60 seconds) for the first two slots
                slotsWithTimer++;
            }
            const timeLeftInSeconds = timeLeftInMinutes * 60; // Convert minutes to seconds
            updateSlotTime(slot, timeLeftInSeconds);
        } else {
            slot.textContent = `Slot ${slot.textContent.split(" ")[1]} (Available)`;
            slot.classList.add("available");
        }
    });
});

function updateSlotTime(slot, timeLeftInSeconds) {
    const timerElement = document.createElement("div");
    timerElement.classList.add("timer");
    slot.appendChild(timerElement);

    const timerInterval = setInterval(function() {
        if (timeLeftInSeconds > 0) {
            timeLeftInSeconds--;
            timerElement.textContent = formatTime(timeLeftInSeconds);
        } else {
            clearInterval(timerInterval);
            slot.textContent = `Slot ${slot.textContent.split(" ")[1]} (Available)`;
            slot.classList.remove("occupied");
            slot.classList.add("available");
        }
    }, 1000);
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}
