
// console.log("Content script started!");

const video = document.querySelector('video');

if (video) {

    // console.log("Video found!");
    chrome.runtime.sendMessage({msg: "video is found my G"});
    
    video.addEventListener('seeked', () => {
        // console.log('seeked:', video.currentTime);
        if (seekFlag) seekFlag = false;
        else seekHandler();
    });

    video.addEventListener('timeupdate', () => {
        // console.log('timeupdate:', video.currentTime);
        previousTime = currentTime;
        currentTime = video.currentTime;
    });

    chrome.runtime.onMessage.addListener(
        function(request, _sender, _sendResponse) {
            if (request.msg === "undo triggered") {
                undoHandler();
            }
            if (request.msg === "redo triggered") {
                redoHandler();
            }
        }
    );

}


let currentTime = 0;
let previousTime = 0;
let undoStack = [];
let redoStack = [];
let seekFlag = false;

function seek(time) {
    seekFlag = true;
    video.currentTime = time;
}

function seekHandler() {
    // console.log('seek handler');
    undoStack.push(previousTime);
    redoStack = [];
}

function undoHandler() {
    // console.log('undo handler');

    if (undoStack.length === 0)
        return;

    redoStack.push(video.currentTime);
    seek(undoStack.pop());
}

function redoHandler() {
    // console.log('redo handler');

    if (redoStack.length === 0)
        return;

    undoStack.push(video.currentTime);
    seek(redoStack.pop());
}

