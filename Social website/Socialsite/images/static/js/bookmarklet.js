const siteUrl = 'https://127.0.0.1:8000/';
const styleUrl = siteUrl + 'static/css/bookmarklet.css';
const minWidth = 200;
const minHeight = 200;

// Load CSS
var head = document.getElementsByTagName('head')[0];
var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = styleUrl + '?r=' + Math.floor(Math.random()*99999999999999999999);
head.appendChild(link);

// Load HTML
var body = document.getElementsByTagName('body')[0];
if (!document.getElementById('bookmarklet')) {

    var boxHtml = `
    <div id="bookmarklet">
        <a href="#" id="close">&times;</a>
        <h1>Select an image to bookmark:</h1>
        <div class="images"></div>
    </div>`;

    var div = document.createElement('div');
    div.innerHTML = boxHtml;
    body.appendChild(div);
}

function bookmarkletLaunch(){

    var bookmarklet = document.getElementById('bookmarklet');
    var imagesFound = bookmarklet.querySelector('.images');

    imagesFound.innerHTML = '';
    bookmarklet.style.display = 'block';

    bookmarklet.querySelector('#close').addEventListener('click', function(){
        bookmarklet.style.display = 'none';
    });

    var images = document.querySelectorAll('img[src$=".jpg"], img[src$=".jpeg"], img[src$=".png"]');

    images.forEach(image => {

        if(image.naturalWidth >= minWidth && image.naturalHeight >= minHeight){

            var imageFound = document.createElement('img');
            imageFound.src = image.src;
            imageFound.title = image.src;

            imagesFound.appendChild(imageFound);

            imageFound.addEventListener('click', function(e){

                var selectedImage = e.target.src;
                var pageTitle = document.title;

                window.open(
                    siteUrl + 'images/create/?url='
                    + encodeURIComponent(selectedImage)
                    + '&title='
                    + encodeURIComponent(pageTitle),
                    '_blank'
                );

                bookmarklet.style.display = 'none';

            });
        }
    });
}

bookmarkletLaunch();