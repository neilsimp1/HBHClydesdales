---
layout: blog
title: Blog
---

{% for post in site.posts %}
{% if post.title != 'Blog' %}
<h2 style="margin:0;font-weight:bold;"><a href="{{post.permalink}}">{{post.title}}</a></h2>
posted on **{{post.dateText}}** by **{{post.author}}**

{{post.content}}

<hr />
{% endif %}
{% endfor %}