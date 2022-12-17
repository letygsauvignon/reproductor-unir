const btnReaccion = document.getElementById('reaccion');
const contenedorListaMusic = document.getElementById('lista-music');
const controles = document.getElementById('controles');

const menuMusic = document.getElementById('menuMusic');
const titlePlaylist = document.getElementById('titlePlaylist');
const playDescription = document.getElementById('playDescription');
const imgAlbum = document.getElementById('imgAlbum');
const album = document.getElementById('album');

//Eventos
//btnReaccion.addEventListener('click', likear);
menuMusic.addEventListener('click', cargarInfo);
contenedorListaMusic.addEventListener('click', reproducirMusica);
//controles.addEventListener('click', controlar)
    //Funciones
let estado = 0;


function likear() {
    if (estado === 0) {
        btnReaccion.classList.add('reaccion-activa');
        estado = 1;
    } else if (estado === 1) {
        btnReaccion.classList.remove('reaccion-activa');
        estado = 0;
    }
}


function cargarInfo(e) {
    let jsonurl = '';
    let titlePlay = '';
    let descripcionPlay = '';
    let srcImg = '';

    if (e.target.classList.contains('playEstudiar')) {
        jsonurl = 'assets/musicJSON/estudiando.json';
        titlePlay = 'Acustico';
        descripcionPlay = 'Gutarra';
        srcImg = 'assets/img/acustica.jpg';  
        album.style.background = "linear-gradient(to right, rgba(2, 2, 2, 0.726) 15%, rgba(8, 8, 8, 0.829)), url(assets/img/acustica.jpg)";
    } else if (e.target.classList.contains('playRock')) {
        jsonurl = 'assets/musicJSON/rock.json';
        titlePlay = 'Rock ligero';
        descripcionPlay = 'Bon Jovi';
        srcImg = 'assets/img/electrica.jpg';
        album.style.background = "linear-gradient(to right, rgba(2, 2, 2, 0.726) 15%, rgba(8, 8, 8, 0.829)), url(assets/img/electrica.jpg)";
    }
    titlePlaylist.innerHTML = titlePlay;
    playDescription.innerHTML = descripcionPlay;
    imgAlbum.src = srcImg;
    cargarMusica(jsonurl);
}

function cargarMusica(url) {
    fetch(url)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            let html = '';
            data.forEach(music => {
                html += `
                <li class="music">
                    <input type="text" value="${music.url}" style="display: none;">
                    <a href="#" id="${music.id}" class="btn play-music"><i class="far fa-play-circle"></i></a>
                    <h3>${music.artista}</h3> 
                    <h3 class="name" id="name">${music.nombre}</h3> 
                    <h3 class="time">--</h3>
                </li>
                `
                contenedorListaMusic.innerHTML = html;
            });
        });
}

function reproducirMusica(e) {
    if (e.target.parentElement.classList.contains('play-music')) {
        
        let urlM = e.target.parentElement.previousElementSibling.value;
        controles.innerHTML = `<a href="#" class="btn control atras"><i class="fas fa-backward"></i></a>
        <video src="${urlM}" style="width: 50vw;" width="380" height="390" controls autoplay type="video/mp4">
        <input type="text" value="${urlM}" style="display: none">
            if (${urlM} = "assets/music/estudiar/All.mp4") {
                <track src="All.vtt" kind="subtitles" label="All of me" srclang="en"></track>   
            
            elseif (${urlM} = "assets/music/estudiar/Thinking.mp4") 
                <track src="Thinking.vtt" kind="subtitles" label="Thinking out load" srclang="en"></track>   
            
            elseif (${urlM} = "assets/music/estudiar/Just.mp4") 
                <track src="Just.vtt" kind="subtitles" label="Just you were you are" srclang="en"></track> 
            
            else (${urlM} = "assets/music/estudiar/Photograph.mp4")
                <track src="Photograph.vtt" kind="subtitles" label="Photograph" srclang="en"></track>  
            } 

        <a href="#" class="btn control siguiente"><i class="fas fa-forward"></i></a> </video>`;

        e.target.parentElement.classList.add('reaccion-activa-reproducida');
        siguienteAutomatico();
    }
}

function controlar(e) {
    let video = e.target.parentElement.parentElement.children[1].children[0];
    let videoUrl = video.value;

    let musicArray = Array.from(contenedorListaMusic.children);

    if (e.target.parentElement.classList.contains('siguiente')) {
        musicArray.forEach(limusic => {
            if (limusic.children[0].value === videoUrl) {
                let siguienteMusica = limusic.nextElementSibling.children[0].value;

                let elementoParaReproducido = limusic.nextElementSibling.children[1];
                siguienteAtras(siguienteMusica, elementoParaReproducido)
            }
        });
    }
    if (e.target.parentElement.classList.contains('atras')) {
        musicArray.forEach(limusic => {
            if (limusic.children[0].value === videoUrl) {
                let musicaAtras = limusic.previousElementSibling.children[0].value;

                let elementoParaReproducido = limusic.previousElementSibling.children[1];
                siguienteAtras(musicaAtras, elementoParaReproducido)
            }
        });
    }
}

function siguienteAtras(musica, reproducida) {
    controles.innerHTML = `<a href="#" class="btn control atras"><i class="fas fa-backward"></i></a>
    <video src="${musica}" style="width: 50vw;" width="380" height="390" controls autoplay >
    <input type="text" value="${musica}" style="display: none;"></video>
    <a href="#" class="btn control siguiente"><i class="fas fa-forward"></i></a>`;
    reproducida.classList.add('reaccion-activa-reproducida');

    siguienteAutomatico();
}

function siguienteAutomatico() {
    let videoEtiqueta = controles.children[1];
    videoEtiqueta.addEventListener('ended', () => {
        let videoUrl = videoEtiqueta.children[0].value;
        let musicArray = Array.from(contenedorListaMusic.children);
        musicArray.forEach(limusic => {
            if (limusic.children[0].value === videoUrl) {
                let siguienteMusica = limusic.nextElementSibling.children[0].value;

                let elementoParaReproducido = limusic.nextElementSibling.children[1];
                siguienteAtras(siguienteMusica, elementoParaReproducido)
            }
        });
    })
}