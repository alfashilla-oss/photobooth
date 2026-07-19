const video = document.getElementById("video");
const canvas = document.getElementById("canvas");

const startCamera = document.getElementById("startCamera");
const takePhoto = document.getElementById("takePhoto");

let stream = null;

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

takePhoto.addEventListener("click", () => {

    try {

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");

        ctx.drawImage(video, 0, 0);

        alert("Foto berhasil digambar ke canvas");

    } catch (err) {

        alert(err.message);
        console.log(err);

    }

});

