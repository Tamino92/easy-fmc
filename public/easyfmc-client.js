/**
 * http://usejsdoc.org/
 */


var widgets = [{
    id : "FMCB737",
    defFile : "fmc-b737_2.svg"
},
               {
                   id : "MCDU",
                   defFile : "mcdu.scg"
               }]

function findById(source, id) {
    for (var i = 0; i < source.length; i++) {
        if (source[i].id === id) {
            return source[i];
        }
    }
}


$( document ).ready(function() {
    var socket = {} ;
    var mod = "prod" ;

    console.log(localStorage.name);


    // starting form
    $('#startingForm').on('submit', function (e) {    
        if (e.isDefaultPrevented()) {
        } else {
            e.preventDefault() ;
            // connection to server
            var connectionString = $('#server_name').val()+':'+$('#server_port').val() ;
            // kept all default values
            var options = {
                reconnection  : true,
                reconnectionDelay : 1000,
                reconnectionDelayMax : 5000,
                timeout : 20000
            } ;
            console.log(connectionString) ;
            socket = io(connectionString);

            socket.on("connect",function() {

                // loading the widget
                $('#widget').load(findById(widgets,"FMCB737").defFile,function(data){
                    // register clicks callbacks
                    $('.btn').on('click',function(){
                        socket.emit('click',$(this).attr('id'));
                    });
                    // set bebug mode
                    if (mod==="debug"){
                        console.log('showing debug mod');
                        $(".btn").attr("class", "btn prod");
                        $(".btn").attr("class", "btn debug");
                    }
                    else {
                        $(".btn").attr("class", "btn prod");
                    }

                });
                //$('#widget').toggle() ;

                $( "#startScreen" ).toggle();
                //$('#widget').toggle() ;
                $('body').toggleClass("run") ;
                // Socket messages
                socket.on('msg',function(data){
                    $('#ret_text').text(data) ;
                    //console.log('recived : '+data) ;
                });
            });

            socket.on("connect_error",function(obj){
                // todo
            });

            socket.on("connect_timeout",function(){
                // todo
            });

            socket.on("reconnect",function(number){
                // todo
            });

            socket.on("reconnect_attempt",function(){
                // todo
            });

            socket.on("reconnecting",function(number){
                // todo
            });

            socket.on("reconnect_error",function(obj){
                // todo
            });

            socket.on("reconnect_failed",function(){
                // todo
            });
        }
    });
});