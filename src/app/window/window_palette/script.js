// Item click event
seatContainer.addEventListener('click', (e) => {
    const request = '';
    if (e.target.classList.contains('item-textbox')) {
        addTextBox();
        const total = document.getElementById('textbox');
    }
    if (e.target.classList.contains('item-image')) {
        addImage();
    }
    if (e.target.classList.contains('item-button')) {
        addButton();
    }
  });
  
function addTextBox() {
    //addPost(request);    
    (click) = "textbox";
}

function addImage() {

}

function addButton() {

}