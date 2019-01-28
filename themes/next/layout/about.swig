{% extends '_layout.swig' %}
{# {% import '_macro/post-collapse.swig' as post_template %} #}
{% import '_macro/sidebar.swig' as sidebar_template %}

{# {% block title %}{{ __('title.tag') }}: {{ page.tag }} | {{ config.title }}{% endblock %} #}
{% block title %}{{ page.title }} | {{ config.title }}{% endblock %}
{% block content %}

  {#################}
  {### TAG BLOCK ###}
  {#################}
 <style type="text/css" media="screen">
   .tag p{
    color: white;;
    text-align: center
   }
   .tag{
    margin-top: 50px;
   }
 </style>
  <div class=" tag" >
    <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=400 src="//music.163.com/outchain/player?type=0&id=2059184801&auto=0&height=430"></iframe>
    <p class="post-block">tracerZzz</p>
    <p class="post-block">love coding sport music</p>
    <p class="post-block"><a href="../welcome/">瞎写写</a></p>
    <p class="post-block">email: 173439618@qq.com 或者zzztracer@gmail.com </p>
    <h2 class="post-block" style="text-align:center;color: white;">有事请发邮件或者在下方留言哟↓↓↓  </h2>
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
