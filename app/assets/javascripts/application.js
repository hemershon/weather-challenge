// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require_tree .
document.addEventListener("turbolinks:load", function () {

    var token = $( 'meta[name="csrf-token"]' ).attr( 'content' );

    $.ajaxSetup( {
        beforeSend: function ( xhr ) {
            xhr.setRequestHeader( 'X-CSRF-Token', token );
        }
    });

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach( el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }

    $('#favorit').on('click', function(e) {
        if ($('#favorit').hasClass('has-text-danger')) {
            $('#favorit').removeClass('has-text-danger');
        } else {
            $.post('/cities', {city: {name: $('#city_name').val()}});
        }
    })
});

function activatePlacesSearch() {
    var input = document.getElementById('search_term');
    var autocomplete = new google.maps.places.Autocomplete(input);

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        get_weather(input.value);
    })
}

function get_weather(city) {
    $.getJSON('/api/weather?city=' + city, function(data) {
        if (data.error) {
            $('.title').html(data.error)
        } else {
            $('#city_name').val(city);
            $('.title').html("Weather for " + data.city + "<br/>" +
                data.temperature + "ºF / " + data.temperature_in_celsius + "ºC")
            $('.pressure').text(data.pressure + 'hpa');
            $('.humidity').text(data.humidity + '%');
            $('.min_temperature').text(data.min_temperature + "ºF / " + data.min_temperature_in_celsius + "ºC");
            $('.max_temperature').text(data.max_temperature + "ºF / " + data.max_temperature_in_celsius + "ºC");
            $('.wind_speed').text(data.wind_speed + "mi/h");
        }
    })
}