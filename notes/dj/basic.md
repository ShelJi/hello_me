# Django

TemplateView

ListView
DetailView
CreateView
UpdateView
DeleteView

## Template Views

These views are used when you simply need to render a template with or without context.

```bash
from django.views.generic import TemplateView

class AboutView(TemplateView):
    template_name = 'about.html'
```

These views are used when you simply need to render a template with or without context.

```bash
from django.views.generic import TemplateView

class AboutView(TemplateView):
    template_name = 'about.html'
```

## 2. Views for Models (CRUD Operations)

## 2.1 ListView

Used to display a list of objects from a database model.

```bash
from django.views.generic import ListView
from .models import Post

class PostListView(ListView):
    model = Post
    template_name = 'post_list.html'
    context_object_name = 'posts'    # over ride the object name
```

## 2.2 DetailView

Used to display details of a single object based on its ID or some identifier.

```bash
from django.views.generic import DetailView
from .models import Post

class PostDetailView(DetailView):
    model = Post
    template_name = 'post_detail.html'
    context_object_name = 'post'
```

## 2.3 CreateView

Used to create a new object in the database using a form.

```bash
from django.views.generic import CreateView
from .models import Post
from django.urls import reverse_lazy

class PostCreateView(CreateView):
    model = Post
    template_name = 'post_form.html'
    fields = ['title', 'content']
    success_url = reverse_lazy('post_list')

# or

from django.views.generic import FormView
from django.urls import reverse_lazy
from .forms import PostForm

class PostCreateView(FormView):
    template_name = 'post_form.html'
    form_class = PostForm
    success_url = reverse_lazy('post_list')

    # these lines are not necessary
    def form_valid(self, form):
        # Here you can handle form submission and manually save to the model
        title = form.cleaned_data['title']
        content = form.cleaned_data['content']
        
        # Example of saving to the model manually:
        Post.objects.create(title=title, content=content)
        
        return super().form_valid(form)
```

## 2.4 UpdateView

Used to update an existing object.

```bash
from django.views.generic import UpdateView
from .models import Post
from django.urls import reverse_lazy

class PostUpdateView(UpdateView):
    model = Post
    template_name = 'post_form.html'
    fields = ['title', 'content']
    success_url = reverse_lazy('post_list')
```

## 2.5 DeleteView

Used to delete an object.

```bash
from django.views.generic import DeleteView
from .models import Post
from django.urls import reverse_lazy

class PostDeleteView(DeleteView):
    model = Post
    template_name = 'post_confirm_delete.html'
    success_url = reverse_lazy('post_list')
```

## Main command

`django-admin`  #shows all available comands

## msql

```bash
pip install mysqlclient

django-admin startproject newApp
cd newApp
django-admin startapp blog

python manage.py runserver

python manage.py makemigrations
python manage.py migrate
```

## url path redirect

```py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include("blog.urls")),
    path('admin/', admin.site.urls),
]


# dynamic urls
path("post/<int:post_id>")
path("post/<str:post_str>")


# reversed nad named url
from django.urls import reverse

def for_reverse(request):
    return redirect(reverse("blog:redirect"))

app_name = 'blog'

path("redirect_to/", views.redirect_to, name="redirect"),
```

# statics

```django
{% load static %}

<link rel="stylesheet" href="{% static "style.css" %}">
```

## dynamic content

```html

main html file
{% extends "header_footer.html" %}
{% block content %}
{% endblock %}

extended header footer html file
{% load static%}
{% block content %}
{% endblock %}

<!-- Includes -->

{% include "header.html" %}

<!-- variable interpolation -->

{{ data }}

<!-- filters -->

{{ data | upper }}
{{ data | length }}
{{ data | truncatewords:1 }}
{{ data | default:"no data" }}

 <!-- url tag dynamic url  -->
access through reverse
1.40 jvl
{% url 'appname:name' post_id=post.id %}
```

## 404 page

```py
handler404 = 'app.views.custom_page'

set debug = False
# set templates-->DIR--> the template folder path
set localhost

# models

models.BooleanField(default=False, help_text="0-show,1-hidden")
models.DateTimeField(auto_now_add=True)

# img model

"""
1)settings--> import os
--> below-->STATIC_URL='static/'
-->MEDIA_ROOT=os.Path.join(BASE_DIR, "media")
MEDIA_URL = "/media/"

2)from django.conf import settings
from django.conf.urls.static import static

urls-->UrlPatterns=[]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

3)views--> instance=data(used in function where data is called to save)

4)HTML--> after Method=POST--> enctype=multipart/formdata
"""
```

## super user

`py manage.py createsuperuser`

## access previleage

```py
admin jazzmin
pip install django-jazzmin
# settings---> installed apps---> 'jazzmin',


#  super user

py manage.py createsuperuser
admin--> from models import *
admin.site.register(product)

models--> def __str__ (self):
return self.productname + self.productdata
```

## ENVIRON

`pip install django-environ`

```python
import environ

env = environ.Env()
environ.Env.read_env(BASE_DIR / '.env')

SECRET_KEY = env("SECRET_KEY")
```
