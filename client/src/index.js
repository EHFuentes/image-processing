// submit button click handler
const submitButton = document.getElementById('submit');

// add event listener to submit button
submitButton.addEventListener('click', async (event) => {
  // prevent default behavior
  event.preventDefault();


  // create new file input element
  const fileInput = document.getElementById('myFile');

  // Get file from file input and grab the name
  const file = fileInput.files[0].name;


  // File validation - if no file is selected, alert user
  if (!file) {
    alert('Please select a valid image file.');
    return;
  }

  // create new form data to append file
  const formData = new FormData();

  console.log('formData:', formData)

  // append file to form data from file input and send to server
  formData.append('filename', file);

  const response = await fetch(`http://localhost:3000/api/images?filename=${file}`, {
    method: 'POST',
    body: formData,
    key: 'filename',
    value: file
  });

  // Clear file input file value
  document.getElementById("myFile").value = "";

  if (!response.ok) {
    const errorMessage = await response.text();
    alert(`Error processing image: ${errorMessage}`);
    return;
  }

  const processedImageUrl = await response.text();
  const previewImage = document.getElementById('preview');
  previewImage.src = processedImageUrl;

});

function isImage(type) {
  console.log('type', type)
  return /^image\/(jpg|jpeg|png|webp)$/.test(type);
}

function dropHandler(event) {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  console.log(file);
}

function dragOverHandler(event) {
  event.preventDefault();
}