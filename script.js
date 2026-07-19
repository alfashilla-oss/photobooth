const video = document.getElementById("video");
const canvas = document.getElementById("canvas");

const startCamera = document.getElementById("startCamera");
const takePhoto = document.getElementById("takePhoto");

let stream = null;

let photos = [];

startCamera.addEventListener("click", async () => {

    try {

        stream = await navigator.mediaDevices.getUserMedia({

            video: {
                facingMode: "user"
            },

            audio: false

        });

        video.srcObject = stream;

    } catch (err) {

        alert("Kamera tidak dapat dibuka.");

        console.log(err);

    }

});

const preview = document.getElementById("preview");

const countdown = document.getElementById("countdown");

function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

takePhoto.addEventListener("click", async () => {

    for(let i = 3; i >= 1; i--){

        countdown.textContent = i;

        await delay(1000);

    }

    countdown.textContent = "";

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(video, 0, 0);

    preview.src = canvas.toDataURL("image/png");

    preview.style.display = "block";

});
