// check if service worker is supported
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then((reg) => console.log('service worker registered', reg))
    .catch((err) => console.log('service worker not registered', err));
}

const DB_STORE_NAME = 'contacts';
// const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
const request = window.indexedDB.open('contacts', 1);
let db;

request.onerror = (event) => {
  console.error('An error occurred with IndexedDB');
  console.error(event);
};

// 새로 만들거나 버전이 높을 때만 발생하는 이벤트
// ObjectStore를 만들거나 수정할 때 이 이벤트내에서 진행
// onsuccess는 이 이벤트가 끝나면 발생
request.onupgradeneeded = (event) => {
  db = request.result;
  const store = db.createObjectStore(DB_STORE_NAME, {
    keyPath: 'id',
    autoIncrement: true,
  });
};

request.onsuccess = () => {
  db = request.result;
  const transaction = db.transaction(DB_STORE_NAME, 'readwrite');
  const store = transaction.objectStore(DB_STORE_NAME);

  // store.put({ id: 1, name: '이현진', phone: '010-1234-5678' });
  // store.put({ id: 2, name: '윤지영', phone: '010-1234-5678' });
  // store.put({ id: 3, name: '박지성', phone: '010-1234-5678' });

  const getRequest = store.getAll();

  getRequest.onsuccess = function (event) {
    renderContacts(getRequest.result);
  };
};

// const getObjectStore = (storeName, mode) => {
//   return db?.transaction(storeName, mode).objectStore(storeName);
// };

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!form.name.value || !form.numbers.value)
    return alert('Please fill in all the fields');

  const contact = {
    name: form.name.value,
    number: form.numbers.value,
  };

  // const transaction = db.transaction(DB_STORE_NAME, 'readwrite');
  // const contacts = transaction.objectStore(DB_STORE_NAME);

  // contacts.add(contact);

  let contacts = localStorage.getItem('contacts');
  console.log(contacts);

  if (!contacts) {
    localStorage.setItem('contacts', JSON.stringify([contact]));
  } else {
    contacts = JSON.parse(localStorage.getItem('contacts'));
    contacts = [...contacts, contact];
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }
  renderContacts(contacts);

  form.name.value = '';
  form.numbers.value = '';
  form.name.focus();
});

const renderContacts = (contacts) => {
  const html = contacts
    .map(
      (contact, index) => `
  <div class="grey-text text-darken-1 pk-contact" >
    <div class="contact-image">
      <img src="img/pkcontacts.png" alt="contact thumb" />
    </div>
    <div class="contact-details">
      <div class="contact-title">${contact.name}</div>
      <div class="contact-numbers">${contact.number}</div>
    </div>
    <div class="contact-options">
      <i class="material-icons">call</i>
      <i class="material-icons" data-index=${index}>delete_outline</i>
    </div>
  </div>  
  `
    )
    .join('');

  const contactsList = document.querySelector('.contacts');

  contactsList.innerHTML = html;
};

const contactsList = document.querySelector('.contacts');
contactsList.addEventListener('click', (event) => {
  console.log(event);
  console.log(event.target.tagName);
  console.log(event.target.getAttribute('data-index'));
  if (event.target.tagName === 'I') {
    const index = event.target.dataset.index;

    const contacts = JSON.parse(localStorage.getItem('contacts'));
    const filteredContacts = contacts.filter(
      (contact) => contact.number != contacts[index].number
    );
    localStorage.setItem('contacts', JSON.stringify(filteredContacts));
    renderContacts(filteredContacts);
    // const transaction = db.transaction(DB_STORE_NAME, 'readwrite');
    // const store = transaction.objectStore(DB_STORE_NAME);
    // 이거왜 안되는지 모르겠음 ㅠㅠ
    // const deleteRequest = store.delete(event.target.getAttribute('data-index'));

    // transaction.oncomplete = () => {
    //   console.log(deleteRequest);
    // };

    // const getRequest = store.getAll();

    // getRequest.onsuccess = function (event) {
    //   renderContacts(getRequest.result);
    // };
  }
});

// window.addEventListener('DOMContentLoaded', () => {
//   console.log(JSON.parse(localStorage.getItem('contacts')));
//   renderContacts(JSON.parse(localStorage.getItem('contacts')));
// });

setTimeout(() => {
  console.log(JSON.parse(localStorage.getItem('contacts')));
  renderContacts(JSON.parse(localStorage.getItem('contacts')));
}, 1000);
