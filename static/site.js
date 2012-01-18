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

var Site = {
  default: function() {
    // Any JavaScript that needs to run on every page should go here.
  },

  upcoming: function() {
    var signed_url = "http://api.meetup.com/2/events.json/?group_id=1366859&status=upcoming&_=1323957798477&sig_id=7728671&order=time&desc=false&sig=79e04bfe18e4845882f65aebc76c89b33cfbaf71&offset=0&callback=?&format=json&page=200&fields=&sig_id=7728671&sig=73b75f3ee416fb0891de36fae02a9aed6cfd10d3"
    $.getJSON(signed_url, function (data) {
      var nextMeetup = data.results[0];
      var date = new Date(nextMeetup.time);
      var address = [nextMeetup.venue.address_1, nextMeetup.venue.address_2, nextMeetup.venue.city, nextMeetup.venue.state].join(', ');
      $('#next_meetup_name').html(nextMeetup.name);
      $('#next_meetup_description').html(nextMeetup.description);
      $('#next_meetup_address').html(nextMeetup.venue.name + ', ' + address);
      $('#next_meetup_date').html(date.toLocaleString('%b %e, %l:%M %p'));
      $('#next_meetup_rsvpcount').html(nextMeetup.yes_rsvp_count);
      $('#next_meetup_event_url').attr('href', nextMeetup.event_url);

      var map = $('#next_meetup_venue_map');
      map.attr('src', 'http://maps.googleapis.com/maps/api/staticmap?sensor=false&size=535x400&markers='+address);
      map.parent('a').attr('href', 'http://maps.google.com/maps?daddr='+address);
      map.parent('a').attr('target', '_blank')
      map.show();
    });
  }
}
