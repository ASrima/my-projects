var numUpdates = 0

function updateMessages() {
  $("#table tr:not(:first)").empty()
    numUpdates++
    $.getJSON("http://cs120.liucs.net/assn4/messages.json", "", function(data){
        // TODO: format the messages nicely
        d = JSON.stringify(data)
      //$("#messages").html(d)
      for(var i = 0; i < data.length; i++){
        $("#table").append( '<tr>' + "<td>" + data[i].sender + "</td><td>" + data[i].text+ "</td><td>" + data[i].mood + "</td>"+ "</tr>")
      }
    })
    // Call this function again after 10s delay
    setTimeout(updateMessages, 10000)
}

$(function(){
    console.log("READY TO GO.")
    ;
    $("#post").click(function(event){
        event.preventDefault()
        console.log("YOU CLICKED.")
        // Grab field values
        var sender = $("#sender").val()
        var message = $("#message").val()
        var mood = $("#mood").val()
        console.log([sender, message, mood])
        // TODO: validate that sender/message are non-empty
        // Create message object, TODO:
        var obj = {sender: sender, text: message}
        if(mood.length > 0){
              obj = {sender: sender, text: message, mood:mood}

        }
        console.log(obj)
        // TODO(CL): fix OPTIONS for CORS preflight on server
        if((sender.length == 0) || (message.length == 0)){
          alert("field is empty!")
        }
        if((sender.length > 0) && (message.length > 0)){
          $.ajax({
              url: "http://cs120.liucs.net/assn4/messages.json",
              type: "POST",
              data: JSON.stringify(obj),
              contentType:"application/json; charset=utf-8",
              dataType:"json",
              success: function(){
                  console.log("SUCCESS, posted to server")
              }
          })
        }
    })
    updateMessages()
})
