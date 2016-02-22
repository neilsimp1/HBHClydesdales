---
layout: press
title: Press
---

##Press releases

{% for pressRelease in site.press %}
{% if pressRelease.title != 'Press' %}
**{{pressRelease.date}}**: <a href="{{pressRelease.permalink}}">{{pressRelease.title}}</a>
{% endif %}
{% endfor %}

We welcome all media enquiries on <a href="mailto:media@slipspace.co">media@slipspace.co</a>