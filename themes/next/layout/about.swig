{% extends '_layout.swig' %}
{# {% import '_macro/post-collapse.swig' as post_template %} #}
{% import '_macro/sidebar.swig' as sidebar_template %}

{# {% block title %}{{ __('title.tag') }}: {{ page.tag }} | {{ config.title }}{% endblock %} #}

{% block content %}

  {#################}
  {### TAG BLOCK ###}
  {#################}
 <style type="text/css" media="screen">
   .tag p{
    color: #f0bf26;
    text-align: center
   }
   .tag{
    margin-top: 50px;
   }
 </style>
  <div class=" tag" >
    <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=450 src="//music.163.com/outchain/player?type=0&id=2059184801&auto=0&height=430"></iframe>
    <p class="post-block">tracerZzz</p>
    <p class="post-block">boy</p>
    <p class="post-block">1993.04.11</p>
    <p class="post-block">love coding sport music</p>
    <p class="post-block">email: 173439618@qq.com ||zzztracer@gmail.com </p>
    {# <p class="post-block">qq:173439618 </p> #}
    {# <p class="post-block">github:tracerzzz.github.com</p> #}

  </div>
  {#####################}
  {### END TAG BLOCK ###}
  {#####################}

  {% include '_partials/pagination.swig' %}
{% endblock %}

{% block sidebar %}
  {{ sidebar_template.render(false) }}
{% endblock %}
