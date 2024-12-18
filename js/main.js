const plus = document.querySelector('.plus');
const add = document.querySelector('.add');
const popup = document.querySelector('.popup-app');
const titlePopup = document.querySelector('.popup_header h4');
const close = document.querySelector('.close');
const textArea = document.querySelector('textarea');
const button = document.querySelector("button");
const input = document.querySelector("input");
const audio = new Audio("../audios/notification.mp3");
// practical

let notes = JSON.parse(localStorage.getItem('notes') || '[]');

let idx; //علشان اخزن فيه الINDEX بتاع الCARD الي هيتعمله EDIT
let isEdit = false;
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//handle show popup
plus.addEventListener('click', () => {
  popup.classList.add('open');
  titlePopup.innerHTML = 'أضف ملاحظة جديدة';
  button.innerHTML = 'أضافة'
  input.value = ''
  textArea.value = ''
});
//handle close popup
close.addEventListener('click', () => {
  popup.classList.remove('open');
  isEdit = false;
})
//add note
button.addEventListener('click', addNote)
function addNote(e) {
  e.preventDefault();
  let title = input.value.trim();
  let content = textArea.value.trim();
  if (title, content) {
    let date = new Date();
    let month = months[date.getMonth()]
    let day = date.getDate();
    let year = date.getFullYear();
    let noteInfo = {
      title,
      content,
      date: `${month},${day},${year}`
    }
    if (isEdit) {
      notes[idx] = noteInfo;
    }else{
      notes.push(noteInfo);

    }
    localStorage.setItem('notes', JSON.stringify(notes))
    audio.play();
    showNotes()
    close.click();
  }
}

//show notes
function showNotes() {
  document.querySelectorAll('.card').forEach((card) => card.remove())
  if (!notes) return;
  notes.forEach((note, index) => {
    let card = `
    <div class="card card-style">
        <div class="card_content">
          <h4>${note.title}</h4>
          <p>${note.content}</p>
        </div>
        <div class="card_details">
          <span>${note.date}</span>
          <div class="menu-app">
            <i class='bx bx-dots-horizontal-rounded'></i>
            <ul class="menu">
              <li onClick="editNote(${index},'${note.title}','${note.content}')"><i class='bx bx-edit-alt'></i> تعديل </li>
              <li onClick="removeNote(${index})"><i class='bx bx-trash'></i> حذف </li>
            </ul>
          </div>
        </div>
      </div>  
    `;
    add.insertAdjacentHTML('afterend', card)
  })
}
showNotes()

//handle delete note
function removeNote(index) {
  let confirmd = confirm('هل انت متأكد من حذف الملاحظه');
  if (!confirmd) return;
  notes.splice(index, 1)
  localStorage.setItem('notes', JSON.stringify(notes))
  showNotes()
}

//handle edit note
function editNote(index, title, content) {
  console.log(index, title, content);
  idx = index;
  isEdit = true;
  plus.click();
  titlePopup.innerHTML = 'تحديث الملاحظه';
  button.innerHTML = 'تحديث';
  input.value = title;
  textArea.value = content;
}
//                                    انا كان مالي ومال الكلام دا ماكنت دخلت صنايع وريحت دماغي 