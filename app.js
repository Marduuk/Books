$(function (){

    $.ajax({

       url: "http://localhost/API/api/src/books.php",

        data: {},

        type: "GET",

        dataType : "JSON",

        success: function( data ) {

           $(data).each(function (index,element){

               paragrafDataId=element.id;
            $('body').append("<p class='title' data-id='title"+paragrafDataId+"'></p>").append("<div class='info'></div>");//czy opcja z data-id jest dobra? taki format zrobilem zeby sie nie mieszalo z mozliwymi innymi elementami na stronie
            var name = element.name;
            var para=$('.title')[index];
            $(para).text(name);

            })
            $('.title').on('click',function(index){
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
                        clicked.next().text(toDisplay);


                    },
                    error: function( xhr, status, errorThrown ) {console.log('innererror')},

                    complete: function( xhr, status ) {console.log("innerzakonczono")}



                });



            });
        },

        error: function( xhr, status, errorThrown ) {console.log('error')},

        complete: function( xhr, status ) {console.log('zakonczono')}

    });
    console.log($("button"))
    $("#13").on("click", function(){

        var newBookName = $( "input[name='newBookName']").val();
        var newBookAuthor = $( "input[name='newBookAuthor']").val();
        var newBookDescription = $( "input[name='newBookDescription']").val();
        var toStringify={
            "name": newBookName,
            "author": newBookAuthor,
            "description": newBookDescription
        };

        var ajaxToSend = JSON.stringify(toStringify);
    ;
        $.ajax({

            url: "http://localhost/API/api/src/books.php",

            data: {ajaxToSend},

            type: "post",

            dataType : "json",

            success: function( json ) {console.log("ok")},

            error: function( xhr, status, errorThrown ) {console.log("nie ok")},

            complete: function( xhr, status ) {console.log("zakonczono")}

        });



            });








})