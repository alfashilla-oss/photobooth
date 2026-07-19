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
