 // Access the user's webcam
 navigator.mediaDevices.getUserMedia({ video: true })
 .then(function (stream) {
     var video = document.getElementById('webcam');
     video.srcObject = stream;
 })
 .catch(function (error) {
     console.error('Error accessing webcam:', error);
 });

// Function to capture the current frame from the webcam
function captureImage() {
 var video = document.getElementById('webcam');
 var canvas = document.createElement('canvas');
 canvas.width = video.videoWidth;
 canvas.height = video.videoHeight;
 var ctx = canvas.getContext('2d');
 ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

 // Convert the canvas content to a Blob
 canvas.toBlob(function (blob) {
     // Create a FormData object and append the Blob as "image" field
     var formData = new FormData();
     formData.append('image', blob, 'captured_image.jpg');

     // Use fetch to send the FormData to the server
     fetch('/capture', {
         method: 'POST',
         body: formData
     })
     .then(response => response.json())
     .then(data => {
         console.log(data);
         alert(data.message);
     })
     .catch(error => {
         console.error('Error capturing image:', error);
     });
 }, 'image/jpeg');
}


//회원가입
function navigateToSignup() {
    window.location.href = "/signup";
}

//제출하기
function showConfirmation() {
    alert("가입이 완료되었습니다.");
    window.location.href = "/";
}

/////
var video = document.querySelector("#videoElement")

        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                    video.srcObject = stream;
                })
                .catch(function (error) {
                    console.log("다시 확인하세요!")
                });
        }

        function takeSnapshot() {
            var canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            var dataURL = canvas.toDataURL('image/png');

            fetch('/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: dataURL }),
            })
                .then(response => response.json())
                .then(data => console.log('Success:', data))
                .catch(error => console.error('Error:', error));
        }


// //라이브
// const video = document.createElement('video');
// document.body.appendChild(video);
// import { WebSocket } from 'websockets';
// const ws = new WebSocket("ws://localhost:8000/ws");
// ws.onmessage = (event) => {
//     const imageElement = document.getElementById('faceImage');
//     imageElement.src = `data:image/jpeg;base64,${event.data}`;
// };

// ws.onclose = () => {
//     console.log('WebSocket closed');
// };