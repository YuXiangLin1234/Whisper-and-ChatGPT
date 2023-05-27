
function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return (
    [
    //   date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('/') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
}

function disableButton(buttonRef) {
  buttonRef.current.style.cursor = "not-allowed";
  buttonRef.current.style.pointerEvents = "none";
  buttonRef.current.style.opacity = "0.4";
}

function enableButton(buttonRef) {
  buttonRef.current.style.cursor = "pointer";
  buttonRef.current.style.pointerEvents = "auto";
  buttonRef.current.style.opacity = "1";
}

const onRenderDocument = ({blob, filename}) => {
  var blobUrl = URL.createObjectURL(blob);
  saveDocument(blobUrl, filename);
};

const saveDocument = (function () {
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  return function (blob, fileName) {
    a.href = blob;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(blob);
  };
}());

const scrollToBottom = () => {
  window.scrollTo(0, document.body.scrollHeight);
};

export {formatDate, disableButton, enableButton, onRenderDocument, saveDocument, scrollToBottom};