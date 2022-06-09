---
layout: main.html
title: 'Danny Scally: Portfolio'
---

# Portfolio

{% for project in projects -%}
    {% include 'portfolio-entry.html' %}
{%- endfor %}
