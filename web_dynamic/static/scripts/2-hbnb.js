$( document ).ready(function() {
    const amenities = {}

    $.get('http://127.0.0.1:5001/api/v1/status/', function(data) {
      if(data.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    });

    $(".amenities .popover ul li input").on("change", function(){
        const id = $(this).attr("data-id");
        const name = $(this).attr("data-name");
        const isChecked = $(this).is(":checked");
        
        if(isChecked){
            amenities[id] = name;
        } else {
            delete amenities[id];
        }
        console.log(amenities)
        const toList = Object.values(amenities);
        console.log(toList);
        $('.amenities h4').text(toList.join(", "));

    })

});

