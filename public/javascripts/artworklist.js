// Userlist data array for filling in info box
var userListData = [];

window.onload = loadPage;

function loadPage()
{	        
    document.getElementById("card").setAttribute("onClick","flip();");    
}

//load more artworks
function loadMoreArtworks(id) {

    // Empty content string
    var divContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/artworks/artworklist/'+id, function( data ) {

        // For each item in our JSON, add a div to the content string
        $.each(data, function(){
            divContent += '<div class="artworkHolder">';
            divContent += '<div class="artworkHeader"><h2><a href="/artworks/'+ this._id +'">' + this.title + '</a></h2></div>';
            divContent += '<div class="imageHolder"><img src="' + this.thumbnailUrl + '" class="artworkImage"></div>';
            divContent += '</div>';
        });

        var loadButton = document.getElementsByClassName("loadButton");
        var newId = Number(id) + 10;
        var counter;
        for (counter = 0; counter < loadButton.length; counter++) 
        {
            loadButton[counter].id = newId;
        }
        
        // Inject the whole content string to the end of existing div
        $('#artworkList').append(divContent);
    });
};
