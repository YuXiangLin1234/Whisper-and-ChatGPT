
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
  buttonRef.current.style.opacity = "0.6";
}

function enableButton(buttonRef) {
  buttonRef.current.style.cursor = "pointer";
  buttonRef.current.style.pointerEvents = "auto";
  buttonRef.current.style.opacity = "1";
}

export {formatDate, disableButton, enableButton};