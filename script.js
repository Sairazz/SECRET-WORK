// --- Password Logic ---
function checkPassword() {
    const password = document.getElementById('password').value;
    const error = document.getElementById('error');
    const correctPassword = "MySecret123"; // Change to your password

    if(password === correctPassword) {
        window.location.href = "dashboard.html";
    } else {
        error.textContent = "Incorrect password!";
    }
}

// --- Persistent Multi-Book Storage ---
let currentBook = 'book1';
let storage = JSON.parse(localStorage.getItem('storyHubStorage')) || {};

function saveStorage() {
    localStorage.setItem('storyHubStorage', JSON.stringify(storage));
}

function switchBook() {
    currentBook = document.getElementById('bookSelect').value;
    renderAll();
}

// --- Notes ---
function addNote() {
    const title = document.getElementById('noteTitle').value;
    const body = document.getElementById('noteBody').value;
    if(!title || !body) return;

    if(!storage[currentBook]) storage[currentBook] = {notes:[], characters:[], maps:[], timeline:[]};
    storage[currentBook].notes.push({title, body});
    saveStorage();
    renderNotes();

    document.getElementById('noteTitle').value = '';
    document.getElementById('noteBody').value = '';
}

function renderNotes() {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';
    if(!storage[currentBook] || !storage[currentBook].notes) return;
    storage[currentBook].notes.forEach((note, idx) => {
        const div = document.createElement('div');
        div.className = 'note-item';
        div.innerHTML = `<h3>${note.title}</h3><p>${note.body}</p><button onclick="deleteNote(${idx})">Delete</button>`;
        notesList.appendChild(div);
    });
}

function deleteNote(idx) {
    storage[currentBook].notes.splice(idx,1);
    saveStorage();
    renderNotes();
}

// --- Characters ---
function addCharacter() {
    const name = document.getElementById('charName').value;
    const desc = document.getElementById('charDesc').value;
    if(!name || !desc) return;

    if(!storage[currentBook]) storage[currentBook] = {notes:[], characters:[], maps:[], timeline:[]};
    storage[currentBook].characters.push({name, desc});
    saveStorage();
    renderCharacters();

    document.getElementById('charName').value = '';
    document.getElementById('charDesc').value = '';
}

function renderCharacters() {
    const charList = document.getElementById('charList');
    charList.innerHTML = '';
    if(!storage[currentBook] || !storage[currentBook].characters) return;
    storage[currentBook].characters.forEach((char, idx) => {
        const div = document.createElement('div');
        div.className = 'char-item';
        div.innerHTML = `<h3>${char.name}</h3><p>${char.desc}</p><button onclick="deleteChar(${idx})">Delete</button>`;
        charList.appendChild(div);
    });
}

function deleteChar(idx) {
    storage[currentBook].characters.splice(idx,1);
    saveStorage();
    renderCharacters();
}

// --- Maps ---
function addMap() {
    const input = document.getElementById('mapInput');
    if(input.files.length === 0) return;

    if(!storage[currentBook]) storage[currentBook] = {notes:[], characters:[], maps:[], timeline:[]};
    Array.from(input.files).forEach(file => {
        storage[currentBook].maps.push(file.name);
    });
    saveStorage();
    renderMaps();
    input.value = '';
}

function renderMaps() {
    const mapList = document.getElementById('mapList');
    mapList.innerHTML = '';
    if(!storage[currentBook] || !storage[currentBook].maps) return;
    storage[currentBook].maps.forEach(map => {
        const li = document.createElement('li');
        li.textContent = map;
        mapList.appendChild(li);
    });
}

// --- Timeline ---
function addEvent() {
    const title = document.getElementById('eventTitle').value;
    const date = document.getElementById('eventDate').value;
    if(!title || !date) return;

    if(!storage[currentBook]) storage[currentBook] = {notes:[], characters:[], maps:[], timeline:[]};
    storage[currentBook].timeline.push({title, date});
    saveStorage();
    renderTimeline();

    document.getElementById('eventTitle').value = '';
    document.getElementById('eventDate').value = '';
}

function renderTimeline() {
    const timelineList = document.getElementById('timelineList');
    timelineList.innerHTML = '';
    if(!storage[currentBook] || !storage[currentBook].timeline) return;
    storage[currentBook].timeline.forEach(event => {
        const li = document.createElement('li');
        li.textContent = `${event.date}: ${event.title}`;
        timelineList.appendChild(li);
    });
}

// --- Render all sections ---
function renderAll() {
    renderNotes();
    renderCharacters();
    renderMaps();
    renderTimeline();
}

// Initialize first book on load
renderAll();

// --- Background Music ---
let musicPlaying = false;
const music = new Audio('https://cdn.pixabay.com/download/audio/2021/10/05/audio_5e8aa994ff.mp3?filename=relaxing-piano-ambient-11045.mp3'); 
music.loop = true;

function toggleMusic() {
    if(musicPlaying) {
        music.pause();
    } else {
        music.play();
    }
    musicPlaying = !musicPlaying;
}
