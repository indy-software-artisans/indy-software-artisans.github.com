$(function(){
  var page_name = $('body').attr('class');

  if(page_name){
    try{
      eval('Site.'+page_name+'();');
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
    var signed_url = "http://api.meetup.com/2/events.json/?group_id=1366859&status=upcoming&order=time&desc=false&offset=0&callback=%3F%2C&format=json&page=200&fields=&sig_id=7728671&sig=79e04bfe18e4845882f65aebc76c89b33cfbaf71"
    $.getJSON(signed_url, function (data) {
      var nextMeetup = data.results[0];
      var date = new Date(nextMeetup.time);
      var address = [nextMeetup.venue.address_1, nextMeetup.venue.address_2, nextMeetup.venue.city, nextMeetup.venue.state, nextMeetup.venue.zip].join(', ');
      $('#next_meetup_name').html(nextMeetup.name);
      $('#next_meetup_description').html(nextMeetup.description);
      $('#next_meetup_address').html(nextMeetup.venue.name + ', ' + address);
      $('#next_meetup_date').html(date.toLocaleString('%b %e, %l:%M %p'));
      $('#next_meetup_rsvpcount').html(nextMeetup.yes_rsvp_count);
      $('#next_meetup_event_url').attr('href', nextMeetup.event_url);

      $('#next_meetup_venue_map').attr('src', 'http://maps.googleapis.com/maps/api/staticmap?sensor=false&size=500x400&markers='+address).show();
    });
  }
}
