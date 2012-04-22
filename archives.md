---
layout: default
name: archives
---
<h1>Past Meetings</h1>
<ul class="past-meetings">
  {% for meeting in site.categories.meeting %}
    <li>
      <span class="meeting-month">{{ meeting.date | date: "%B %Y" }} - </span>
      <span>{{ meeting.speaker}}</span>
      <h4>{{ meeting.title }}</h4>
    </li>
  {% endfor %}
</ul>