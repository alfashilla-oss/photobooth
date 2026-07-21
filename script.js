alert("script.js berhasil dimuat");

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");

const startCamera = document.getElementById("startCamera");
const takePhoto = document.getElementById("takePhoto");

const downloadPhoto = document.getElementById("downloadPhoto");

let stream = null;

let photos = [];

let finalStrip = "";

startCamera.addEventListener("click", async () => {

    alert("Tombol Buka Kamera ditekan");

    try {

        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "user"
            },
            audio: false
        });

        video.srcObject = stream;

    } catch (err) {

        alert(err.message);
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

const frame = {
    background: "assets/frames/frame1_bg.png",
    overlay: "assets/frames/frame1_overlay.png"
};

async function createPhotoStrip() {

    const stripCanvas = document.createElement("canvas");
    const ctx = stripCanvas.getContext("2d");

    const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 1800;

stripCanvas.width = CANVAS_WIDTH;
stripCanvas.height = CANVAS_HEIGHT;
    
    ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

const positions = [

    // kiri atas
    {
        x: 40,
        y: 190,
        w: 520,
        h: 390
    },

    // kiri tengah
    {
        x: 40,
        y: 690,
        w: 520,
        h: 390
    },

    // kiri bawah
    {
        x: 40,
        y: 1190,
        w: 520,
        h: 390
    },

    // kanan atas
    {
        x: 640,
        y: 190,
        w: 520,
        h: 390
    },

    // kanan tengah
    {
        x: 640,
        y: 690,
        w: 520,
        h: 390
    },

    // kanan bawah
    {
        x: 640,
        y: 1190,
        w: 520,
        h: 390
    }

];
    
    for(let i = 0; i < photos.length; i++){

        const img = await loadImage(photos[i]);

        const p = positions[i];

ctx.drawImage(
    img,
    p.x,
    p.y,
    p.w,
    p.h
);

    }

    finalStrip = stripCanvas.toDataURL("image/png");

    preview.src = finalStrip;
    preview.style.display = "block";

    downloadPhoto.style.display = "inline-block";

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

    await createPhotoStrip();

});

downloadPhoto.addEventListener("click", () => {

    const link = document.createElement("a");

    link.href = finalStrip;

    link.download = "photobooth.png";

    link.click();

});
