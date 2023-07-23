

chrome.runtime.onMessage.addListener(
    function(request, _sender, _sendResponse) {
        if (request.msg === "video is found my G") {
            chrome.commands.onCommand.addListener((command) => {
                // console.log(`Command: ${command}`);
                if (command === 'undo') {
                    handleUndo();
                }
                if (command === 'redo') {
                    handleRedo();
                }
            });
        }
    }
);



async function handleUndo() {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    chrome.tabs.sendMessage(tab.id, {msg: "undo triggered"});
}

async function handleRedo() {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    chrome.tabs.sendMessage(tab.id, {msg: "redo triggered"});
}

