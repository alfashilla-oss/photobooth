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

function loadImage(src) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = src;
    });
}

async function createPhotoStrip() {

    const stripCanvas = document.createElement("canvas");
    const stripCtx = stripCanvas.getContext("2d");

    const width = 320;
    const heightPerPhoto = 240;

    stripCanvas.width = width;
    stripCanvas.height = heightPerPhoto * photos.length;

    for (let i = 0; i < photos.length; i++) {

        const img = await loadImage(photos[i]);

        stripCtx.drawImage(
            img,
            0,
            i * heightPerPhoto,
            width,
            heightPerPhoto
        );
    }

    preview.src = stripCanvas.toDataURL("image/png");
    preview.style.display = "block";
}

takePhoto.addEventListener("click", async () => {

    photos = [];

    for(let foto = 1; foto <= 4; foto++){

        for(let i = 3; i >= 1; i--){

            countdown.textContent = i;

            await delay(1000);

        }

        countdown.textContent = "📸";

        await delay(300);

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");

        ctx.drawImage(video,0,0);

        photos.push(canvas.toDataURL("image/png"));

    }

    countdown.textContent = "Selesai";

    preview.src = photos[0];
    preview.style.display = "block";

});
