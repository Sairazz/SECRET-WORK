// --- Global Storage ---
let storage = JSON.parse(localStorage.getItem('storyHubStorage')) || {book1:{notes:[],characters:[],maps:[],timeline:[]},book2:{notes:[],characters:[],maps:[],timeline:[]},book3:{notes:[],characters:[],maps:[],timeline:[]}};

// --- Password ---
let password = localStorage.getItem('storyHubPassword') || '1234';

function checkPassword(){
    let p = document.getElementById('password').value;
    if(p === password){
        window.location.href='dashboard.html';
    }else{
        document.getElementById('error').textContent='Incorrect Password';
    }
}

function changePassword(){
    let newPass = document.getElementById('newPassword').value;
    if(newPass){
        password=newPass;
        localStorage.setItem('storyHubPassword', password);
        alert('Password Changed!');
    }
}

// --- Book Selection ---
let currentBook = localStorage.getItem('storyHubCurrentBook') || 'book1';
document.getElementById('bookSelect')?.value=currentBook;

function switchBook(){
    currentBook = document.getElementById('bookSelect').value;
    localStorage.setItem('storyHubCurrentBook', currentBook);
    updateOverview();
}

// --- Notes ---
function addNote(){
    let title=document.getElementById('noteTitle').value;
    let body=document.getElementById('noteBody').value;
    if(title && body){
        storage[currentBook].notes.push({title, body});
        localStorage.setItem('storyHubStorage', JSON.stringify(storage));
        document.getElementById('noteTitle').value='';
        document.getElementById('noteBody').value='';
        renderNotes();
        updateOverview();
    }
}

function renderNotes(){
    let notesDiv=document.getElementById('notesList');
    if(!notesDiv) return;
    notesDiv.innerHTML='';
    storage[currentBook].notes.forEach(note=>{
        let div=document.createElement('div');
        div.className='card';
        div.innerHTML=`<h3>${note.title}</h3><p>${note.body}</p>`;
        notesDiv.appendChild(div);
    });
}
renderNotes();

// --- Characters ---
function addCharacter(){
    let name=document.getElementById('charName').value;
    let desc=document.getElementById('charDesc').value;
    if(name && desc){
        storage[currentBook].characters.push({name, desc});
        localStorage.setItem('storyHubStorage', JSON.stringify(storage));
        document.getElementById('charName').value='';
        document.getElementById('charDesc').value='';
        renderCharacters();
        updateOverview();
    }
}

function renderCharacters(){
    let div=document.getElementById('charList');
    if(!div) return;
    div.innerHTML='';
    storage[currentBook].characters.forEach(c=>{
        let d=document.createElement('div');
        d.className='card';
        d.innerHTML=`<h3>${c.name}</h3><p>${c.desc}</p>`;
        div.appendChild(d);
    });
}
renderCharacters();

// --- Maps ---
function addMap(){
    let file=document.getElementById('mapInput').files[0];
    if(file){
        let reader=new FileReader();
        reader.onload=function(e){
            storage[currentBook].maps.push({name:file.name,img:e.target.result});
            localStorage.setItem('storyHubStorage',JSON.stringify(storage));
            renderMaps();
            updateOverview();
        };
        reader.readAsDataURL(file);
    }
}

function renderMaps(){
    let list=document.getElementById('mapList');
    if(!list) return;
    list.innerHTML='';
    storage[currentBook].maps.forEach(m=>{
        let li=document.createElement('div');
        li.className='card';
        li.innerHTML=`<img src="${m.img}" alt="${m.name}"><p>${m.name}</p>`;
        list.appendChild(li);
    });
}
renderMaps();

// --- Timeline ---
function addEvent(){
    let title=document.getElementById('eventTitle').value;
    let date=document.getElementById('eventDate').value;
    if(title && date){
        storage[currentBook].timeline.push({title,date});
        localStorage.setItem('storyHubStorage', JSON.stringify(storage));
        document.getElementById('eventTitle').value='';
        document.getElementById('eventDate').value='';
        renderTimeline();
        updateOverview();
    }
}

function renderTimeline(){
    let list=document.getElementById('timelineList');
    if(!list) return;
    list.innerHTML='';
    storage[currentBook].timeline.forEach(ev=>{
        let div=document.createElement('div');
        div.className='card';
        div.textContent=`${ev.date}: ${ev.title}`;
        list.appendChild(div);
    });
}
renderTimeline();

// --- Overview ---
function updateOverview(){
    document.getElementById('notesCount')?.innerText=storage[currentBook].notes.length;
    document.getElementById('charactersCount')?.innerText=storage[currentBook].characters.length;
    document.getElementById('mapsCount')?.innerText=storage[currentBook].maps.length;
    document.getElementById('timelineCount')?.innerText=storage[currentBook].timeline.length;
}
updateOverview();

// --- Music ---
let audio=new Audio('https://cdn.pixabay.com/download/audio/2021/10/05/audio_5e8aa994ff.mp3?filename=relaxing-piano-ambient-11045.mp3');
function toggleMusic(){
    if(audio.paused) audio.play();
    else audio.pause();
}
