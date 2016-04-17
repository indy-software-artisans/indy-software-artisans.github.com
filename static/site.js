$(function(){
  var page_name = $('body').attr('class');

  if(page_name){
    try{
      Site[page_name]();
    } catch(e) {
      Site.default();
    }
  } else {
    Site.default();
  }
});

function renderUpcoming(data) {
  var nextMeetup = data.results[0];
  var date = new Date(nextMeetup.time);
  var dateString = date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  var timeString = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
  var address = [nextMeetup.venue.address_1, nextMeetup.venue.address_2, nextMeetup.venue.city, nextMeetup.venue.state].join(', ');
  $('#next_meetup_name').html(nextMeetup.name);
  $('#next_meetup_description').html(nextMeetup.description);
  $('#next_meetup_address').html(nextMeetup.venue.name + ', ' + address);
  $('#next_meetup_date').html(dateString + ' at ' + timeString);
  $('#next_meetup_rsvpcount').html(nextMeetup.yes_rsvp_count);
  $('#next_meetup_event_url').attr('href', nextMeetup.event_url);

  var map = $('#next_meetup_venue_map');
  map.attr('src', 'https://maps.googleapis.com/maps/api/staticmap?sensor=false&size=535x400&markers='+address);
  map.parent('a').attr('href', 'https://maps.google.com/maps?daddr='+address);
  map.parent('a').attr('target', '_blank')
  map.show();
}

var Site = {
  default: function() {
    // Any JavaScript that needs to run on every page should go here.
  },

  upcoming: function() {
    var signed_url = "https://api.meetup.com/2/events?offset=0&format=json&limited_events=False&group_urlname=indysa&callback=renderUpcoming&page=1&fields=&order=time&desc=false&status=upcoming&sig_id=13753510&sig=09e14b67a36e448ed2bc8af672a7d62d1a94aaa0"
    $.ajax({
      url: signed_url,
      crossDomain: true,
	  cache: true,
	  dataType: 'script'
    });
  }
}
