$(function (){

    $.ajax({

       url: "http://localhost/API/api/src/books.php",
        data: {},
        type: "GET",
        dataType : "JSON",

        success: function(data) { //z automatu wpisana tutaj data jest wzieta z data 3 wierwsze wyzej tak?

           $(data).each(function (index,element){
               paragrafDataId=element.id;
               $('body').append("<p class='title' data-id='title"+paragrafDataId+"'></p>" +
                   "<a href='' class='link' data-value='"+paragrafDataId+"'>Usun ta ksiazke!</a>")
                   .append("<div class='info'></div>");//czy opcja z data-id jest dobra? taki format zrobilem zeby sie nie mieszalo z mozliwymi innymi elementami na stronie
               var name = element.name;
               var para=$('.title')[index];
               $(para).text(name);
            })
            $('.title').on('click',function(){
                var clicked=$(this)
                var id = $(this).attr('data-id');
                id=id.replace('title','');

               $.ajax({   /*okej w zadaniu mam zrobic to w ten sposob ale czy nie moge wiadomosci o tym elemencie wziac z wczesniejszego ajaxa?*/
                    url:'http://localhost/API/api/src/books.php?id='+id+'',
                    data:{},
                    type:"GET",
                    dataType:"JSON",

                    success: function( innerData ){

                        console.log('innerok');
                        var toDisplay=innerData.author+"<br>"+innerData.description;
                        clicked.next().next().text(toDisplay);
                    },
                    error: function( xhr, status, errorThrown ) {console.log('innererror')},
                    complete: function( xhr, status ) {console.log("innerzakonczono")}
                });
            });
            $('.link').on('click', function (){
                var thisId=$(this).data('value')
                console.log($(this).data('value'))

                $.ajax({
                    url: 'http://localhost/API/api/src/books.php',
                    type: 'DELETE',
                    data: 'idToDelete='+thisId+'',

                    success: function() { console.log("usunieto"); }
                });
            })
        },
        error: function( xhr, status, errorThrown ) {console.log('error')},
        complete: function( xhr, status ) {console.log('zakonczono')}

    });
    $("button").on("click", function(){

        var newBookName = $( "input[name='newBookName']").val();
        var newBookAuthor = $( "input[name='newBookAuthor']").val();
        var newBookDescription = $( "input[name='newBookDescription']").val();
        var toStringify={
            "name": newBookName,
            "author": newBookAuthor,
            "description": newBookDescription
        };
        var ajaxToSend = JSON.stringify(toStringify);

        $.ajax({
            url: "http://localhost/API/api/src/books.php",
            data: {ajaxToSend},
            type: "POST",
            dataType : "JSON",

            success: function( data ) {console.log("ok")},// w zadaniu jest wyslac informacje o sukcesie, zrobic to w funkcji error to chyba zly pomysl? :D
            error: function( xhr, status, errorThrown ) {console.log("nie ok")},// !IMPORTANT no ok dziala przesyla na server, zapisuje ale sypie errorem tym wlasnie o co tutaj chodzi?
            //przeladowac wszystkie ksiazki jezeli sukces, zawinac powyzszego ajaksa w funkcje i go tutaj wstawic?
            complete: function( xhr, status ) {console.log("zakonczono")}
        });
    });
});