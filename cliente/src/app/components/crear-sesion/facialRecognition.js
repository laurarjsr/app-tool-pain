//Obtenemos nuestro elemento video del fichero HTML
const video = document.getElementById('video');

//Se ejecuta cuando tengamos que arrancar toda la librería que incluye la gestión de la cámara.
function startVideo() {
    //Sobreescribimos la varibale getUserMedia en función del navegador que utilicemos
    navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    //Llamamos a la función getUserMedia que nos permitirá recopilar la información captada por la cámara. En el primer parámetro le indicamos de dónde sacamos dicha información, en este caso es del elemento video.
    navigator.getUserMedia({ video: {} },
        stream => video.srcObject = stream,
        err => console.log(err)
    )
}


// Se lanzan todas las promesas en paralelo de tal manera que cuando se hayan lanzado todas ya se podrá lanzar el vídeo, por ello, se emplea un promiseAll
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models'),
    faceapi.nets.ageGenderNet.loadFromUri('/models'),
]).then(startVideo);

video.addEventListener('click', async() => {
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);
    setInterval(async() => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        console.log(detections);
    }, 100);
});
