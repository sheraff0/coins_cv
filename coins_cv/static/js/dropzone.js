// Drag'n'drop image

const fileInput = document.getElementById('input__file');
let dropArea = document.getElementById('drop-area');

function dragoverHandler(e) {
  e.preventDefault();
  e.dataTransfer.setData("text", e.target.id)
}

function dropHandler(e) {
  e.preventDefault();
  const files = e.dataTransfer.files;
  fileInput.files = files;
  fileInput.dispatchEvent(new Event('change'));
  e.dataTransfer.clearData();
}

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName =>
  dropArea.addEventListener(eventName, allowDrop, false));

['dragenter', 'dragover'].forEach(eventName =>
  dropArea.addEventListener(eventName, highlight, false));

['dragleave', 'drop'].forEach(eventName =>
  dropArea.addEventListener(eventName, unhighlight, false));

function allowDrop(e) {
  e.preventDefault();
  e.stopPropagation();
}

function highlight(e) { dropArea.classList.add('highlight') }

function unhighlight(e) { dropArea.classList.remove('highlight') }


function previewFile(file) {
  const preview = document.getElementById('preview');
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function() {
    const preview = document.getElementById('preview');

    let wrap = document.createElement("div");

    let img = document.createElement('img');
    img.src = reader.result;

    wrap.appendChild(img);
    preview.textContent = '';
    preview.appendChild(wrap);
  }
}

function previewFiles(files) {
  files = [...files];
  if (files.length > 0) previewFile(files[0])
}
