// submit button click handler
const submitButton = document.getElementById('submit');

// on submit button click event process image
submitButton.addEventListener('click', async (event) => {
    // prevent default behavior
    event.preventDefault();

    // create new file input element
    const fileInput = document.getElementById('myFile');

    // get height and width from input fields
    const height = Number(document.getElementById('height').value);
    const width = Number(document.getElementById('width').value);

    // File validation - if no file is selected, alert user
    if (!fileInput.files[0]) {
        alert('No Images Selected');
        return;
    }

    // Get file from file input and grab the name
    const file = fileInput.files[0].name;

    // create new form data to append file
    const formData = new FormData();

    // append file to form data from file input and send to server
    formData.append('filename', file);

    // send post request to server with form data
    const response = await fetch(`http://localhost:3000/api/images?filename=${file}&width=${width}&height=${height}`, {
        method: 'post',
        body: formData,
        key: 'filename',
        value: file,
    });

    // Clear file input file value
    document.getElementById('myFile').value = '';

    // If response is not ok, alert user with error message
    if (!response.ok) {
        const errorMessage = await response.text();
        alert(`Error processing image: ${errorMessage}`);
    } else {
        alert('Image processed successfully! Check thumbnails folder.');
    }
});
