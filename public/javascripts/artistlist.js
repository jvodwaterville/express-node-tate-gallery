// Userlist data array for filling in info box
var userListData = [];

//load more artists
function loadMoreArtists(id) {

    var name = document.getElementById('searchName').value;
    // Empty content string
    var divContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/artists/artistlist/'+id, function( data ) {

        // For each item in our JSON, add a div to the content string
        $.each(data, function(){
            var movementsLenght = this.movements.length;
            
            divContent += '<div class="artistHolder">';
            divContent += '<div class="nameHolder"><h2><a href="/artists/'+ this._id +'">' + this.mda + '</a></h2></div>';
            divContent += '<div class="fullLenght">Gender: ' + this.gender + '</div>';
            divContent += '<div class="fullLenght">Birth Year: ' + this.birthYear + '</div>';
            divContent += '<div class="fullLenght">Total Works: ' + this.totalWorks + '</div>';
            
            /*if(movementsLenght > 0)
                {
                    divContent += '<table><tr><th>Movement</th><th>Era</th></tr>';
                    for(var i = 0; i < movementsLenght; i++) 
                    {
                        var obj = this.movements[i];
                        var num = i+1;
                        divContent += '<tr><td>' + obj.name + '</td><td>' + obj.era.name + '</td></tr>';
                    }
                    divContent += '</table>';
                }*/
            
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
        $('#artistList').append(divContent);
    });
};

//search artists
function searchArtists() {

    var name = document.getElementById('searchName').value;
    
    var numRows = 0;
    
    // Empty content string
    var divContent = '';
    
    //if name is blank revert back to original seach
    if(name == "")
    {
         // jQuery AJAX call for JSON
    $.getJSON( '/artists/json', function( data ) {

        // For each item in our JSON, add a div to the content string
        $.each(data, function(){
            var movementsLenght = this.movements.length;
            
            divContent += '<div class="artistHolder">';
            divContent += '<div class="nameHolder"><h2><a href="/artists/'+ this._id +'">' + this.mda + '</a></h2></div>';
            divContent += '<div class="fullLenght">Gender: ' + this.gender + '</div>';
            divContent += '<div class="fullLenght">Birth Year: ' + this.birthYear + '</div>';
            divContent += '<div class="fullLenght">Total Works: ' + this.totalWorks + '</div>';
            
            /*if(movementsLenght > 0)
                {
                    divContent += '<table><tr><th>Movement</th><th>Era</th></tr>';
                    for(var i = 0; i < movementsLenght; i++) 
                    {
                        var obj = this.movements[i];
                        var num = i+1;
                        divContent += '<tr><td>' + obj.name + '</td><td>' + obj.era.name + '</td></tr>';
                    }
                    divContent += '</table>';
                }*/
            
            divContent += '</div>';
        });

        /*var loadButton = document.getElementsByClassName("loadButton");
        var newId = Number(id) + 10;
        var counter;
        for (counter = 0; counter < loadButton.length; counter++) 
        {
            loadButton[counter].id = newId;
        }*/
        
        var x = document.getElementsByClassName("loadButton");
        var i;
        for (i = 0; i < x.length; i++) 
        {
            x[i].style.display = "block";
            x[i].id = 10;
            x[i].setAttribute("onClick","loadMoreArtists(this.id);");
        }
        
        // Inject the whole content string to the end of existing div
        $('#artistList').html(divContent);
    });   
    }
    else 
    {
          // jQuery AJAX call for JSON
    $.getJSON( '/artists/search/'+name, function( data ) {

        // For each item in our JSON, add a div to the content string
        $.each(data, function(){
            numRows++;
            
            var movementsLenght = this.movements.length;
            
            divContent += '<div class="artistHolder">';
            divContent += '<div class="nameHolder"><h2><a href="/artists/'+ this._id +'">' + this.mda + '</a></h2></div>';
            divContent += '<div class="fullLenght">Gender: ' + this.gender + '</div>';
            divContent += '<div class="fullLenght">Birth Year: ' + this.birthYear + '</div>';
            divContent += '<div class="fullLenght">Total Works: ' + this.totalWorks + '</div>';
            
            /*if(movementsLenght > 0)
                {
                    divContent += '<table><tr><th>Movement</th><th>Era</th></tr>';
                    for(var i = 0; i < movementsLenght; i++) 
                    {
                        var obj = this.movements[i];
                        var num = i+1;
                        divContent += '<tr><td>' + obj.name + '</td><td>' + obj.era.name + '</td></tr>';
                    }
                    divContent += '</table>';
                }*/
            
            divContent += '</div>';
        });

        /*var loadButton = document.getElementsByClassName("loadButton");
        var newId = Number(id) + 10;
        var counter;
        for (counter = 0; counter < loadButton.length; counter++) 
        {
            loadButton[counter].id = newId;
        }*/
        
        //hide load more button if there isnt anymore results to load
        if(numRows != 10)
        {
            var x = document.getElementsByClassName("loadButton");
            var i;
            for (i = 0; i < x.length; i++) 
            {
                x[i].style.display = "none";
            }
        }
        else
        {
            var x = document.getElementsByClassName("loadButton");
            var i;
            for (i = 0; i < x.length; i++) 
            {
                x[i].style.display = "block";
                x[i].id = 10;
                x[i].setAttribute("onClick","loadMoreArtistsWithSearch(this.id);");
            }
        }
        
        // Inject the whole content string to the end of existing div
        $('#artistList').html(divContent);
    });  
    }
}

function loadMoreArtistsWithSearch(id)
{
    var name = document.getElementById('searchName').value;
    var numRows = 0;
    // Empty content string
    var divContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/artists/artistlist/'+name+'/'+id, function( data ) {

        // For each item in our JSON, add a div to the content string
        $.each(data, function(){
            numRows++;
            var movementsLenght = this.movements.length;
            
            divContent += '<div class="artistHolder">';
            divContent += '<div class="nameHolder"><h2><a href="/artists/'+ this._id +'">' + this.mda + '</a></h2></div>';
            divContent += '<div class="fullLenght">Gender: ' + this.gender + '</div>';
            divContent += '<div class="fullLenght">Birth Year: ' + this.birthYear + '</div>';
            divContent += '<div class="fullLenght">Total Works: ' + this.totalWorks + '</div>';
            
            /*if(movementsLenght > 0)
                {
                    divContent += '<table><tr><th>Movement</th><th>Era</th></tr>';
                    for(var i = 0; i < movementsLenght; i++) 
                    {
                        var obj = this.movements[i];
                        var num = i+1;
                        divContent += '<tr><td>' + obj.name + '</td><td>' + obj.era.name + '</td></tr>';
                    }
                    divContent += '</table>';
                }*/
            
            divContent += '</div>';
        });

        // Inject the whole content string to the end of existing div
        $('#artistList').append(divContent);
        
        //hide load more button if there isnt anymore results to load
        if(numRows != 10)
        {
            var x = document.getElementsByClassName("loadButton");
            var i;
            for (i = 0; i < x.length; i++) 
            {
                x[i].style.display = "none";
            }
        }
        else
        {
            var loadButton = document.getElementsByClassName("loadButton");
            var newId = Number(id) + 10;
            var counter;
            for (counter = 0; counter < loadButton.length; counter++) 
            {
                loadButton[counter].id = newId;
            }
        }
        
    });
}


