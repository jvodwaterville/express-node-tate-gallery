//On page load run load page function to set objects functions
window.onload = loadPage;

//set objects functions
	function loadPage()
        {	
            populateArtworks();    
        }

// Functions =============================================================

// Fill table with data
function populateArtworks() {
    
    var artistId = document.getElementById('artistId').value;
    
    // Empty content string
    var artworks = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/artworks/findartistartwork/'+artistId, function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            if(this.thumbnailUrl == null)
            {
                  var imgURL = "../images/notfound.jpg";
            }
            else
            {
                var imgURL = this.thumbnailUrl;
            }
            
            artworks +=  '<div class="artworkHolder"><div class="artworkHeader"><h2>'+this.title+'</h2></div><img src="'+imgURL+'" class="artworkImage"></div>';
        });

        // Inject the whole content string into our existing HTML table
        $('#artworkHolder').html(artworks);
    });
};