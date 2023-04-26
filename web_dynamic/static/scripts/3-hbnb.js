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

    $.post('http://127.0.0.1:5100/api/v1/places_search/'), { 
      "Content-Type": "application/json", 
      "data": {}
    }, function(data){
      for (const place of data) {
        let html = "";
        html += `<article>`;
        html += `  <div class="title_box">`;
        html += `    <h2> ${place.name} </h2>`;
        html += `    <div class="price_by_night"> ${place.price_by_night} </div>`;
        html += `  </div>`;
        html += `  <div class="information">`;
        html += `    <div class="max_guest"> ${place.max_guest} Guest </div>`;
        html += `    <div class="number_rooms"> ${place.number_rooms} Bedroom </div>`;
        html += `    <div class="number_bathrooms"> ${place.number_bathrooms} Bathrooms </div>`;
        html += `  </div>`;
        html += `  <div class="user">`;
        html += `    <b>Owner:</b> Asia`;
        html += `  </div>`;
        html += `  <div class="description"> </div>`;
        html += `</article>`;
        $('section.places').append(html);
      }
    }

});

