// check if service worker is supported
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then((reg) => console.log('service worker registered', reg))
    .catch((err) => console.log('service worker not registered', err));
}

const DB_STORE_NAME = 'contacts';

let request = window.indexedDB.open('contacts', 1);

request.onsuccess = () => {
  let db = request.result;
  db.createObjectStore(DB_STORE_NAME, { autoIncrement: true });
};
// 새로 만들거나 버전이 높을 때만 발생하는 이벤트
// ObjectStore를 만들거나 수정할 때 이 이벤트내에서 진행
// onsuccess는 이 이벤트가 끝나면 발생
request.onupgradeneeded = (event) => {
  console.log(event.target);
};

const getObjectStore = (storeName, mode) => {
  return db?.transaction(storeName, mode).objectStore(storeName);
};

const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!form.name.value || !form.numbers.value)
    return alert('Please fill in all the fields');

  const contact = {
    name: form.name.value,
    number: form.numbers.value,
  };

  // let store = getObjectStore(DB_STORE_NAME, 'readwrite');
  const transaction = db.transaction(DB_STORE_NAME, 'readwrite');
  const contacts = transaction.objectStore('contacts');
  contacts.add(contact);
  // const store = transaction.objectStore(DB_STORE_NAME);
  // let result;
  // try {
  //   store.add(contact);
  // } catch (error) {}

  // result.onsuccess = () => {
  //   console.log('hi');
  // };
});
