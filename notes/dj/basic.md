DRY (Don't Repeat Yourself)

TemplateView

ListView
DetailView
CreateView
UpdateView
DeleteView

########### Template Views
# These views are used when you simply need to render a template with or without context.

from django.views.generic import TemplateView

class AboutView(TemplateView):
    template_name = 'about.html'

## 2. Views for Models (CRUD Operations)

########### 2.1 ListView
# Used to display a list of objects from a database model.

from django.views.generic import ListView
from .models import Post

class PostListView(ListView):
    model = Post
    template_name = 'post_list.html'
    context_object_name = 'posts'    # over ride the object name


###########  2.2 DetailView
# Used to display details of a single object based on its ID or some identifier.

from django.views.generic import DetailView
from .models import Post

class PostDetailView(DetailView):
    model = Post
    template_name = 'post_detail.html'
    context_object_name = 'post'

########### 2.3 CreateView
# Used to create a new object in the database using a form.

from django.views.generic import CreateView
from .models import Post
from django.urls import reverse_lazy

class PostCreateView(CreateView):
    model = Post
    template_name = 'post_form.html'
    fields = ['title', 'content']
    success_url = reverse_lazy('post_list')

or

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


########### 2.4 UpdateView
# Used to update an existing object.

from django.views.generic import UpdateView
from .models import Post
from django.urls import reverse_lazy

class PostUpdateView(UpdateView):
    model = Post
    template_name = 'post_form.html'
    fields = ['title', 'content']
    success_url = reverse_lazy('post_list')


## 2.5 DeleteView

# Used to delete an object.

from django.views.generic import DeleteView
from .models import Post
from django.urls import reverse_lazy

class PostDeleteView(DeleteView):
    model = Post
    template_name = 'post_confirm_delete.html'
    success_url = reverse_lazy('post_list')




https://dennisivy.com/django-class-based-views


DRY (Don't Repeat Yourself)

TemplateView - only template render
FormView

ListView   - render with model data
DetailView - render data of specific item based on ID
CreateView
UpdateView
DeleteView

########### Template Views
# These views are used when you simply need to render a template with or without context.

from django.views.generic import TemplateView

class AboutView(TemplateView):
    template_name = 'about.html'

## 2. Views for Models (CRUD Operations)

########### 2.1 ListView
# Used to display a list of objects from a database model.

from django.views.generic import ListView
from .models import Post

class PostListView(ListView):
    model = Post
    template_name = 'post_list.html'
    context_object_name = 'posts'    # over ride the object name


###########  2.2 DetailView
# Used to display details of a single object based on its ID or some identifier.

from django.views.generic import DetailView
from .models import Post

class PostDetailView(DetailView):
    model = Post
    template_name = 'post_detail.html'
    context_object_name = 'post'

########### 2.3 CreateView
# Used to create a new object in the database using a form.

from django.views.generic import CreateView
from .models import Post
from django.urls import reverse_lazy

class PostCreateView(CreateView):
    model = Post
    template_name = 'post_form.html'
    fields = ['title', 'content']
    success_url = reverse_lazy('post_list')

or

from django.views.generic import FormView   ### form view used for forms
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


########### 2.4 UpdateView
# Used to update an existing object.

from django.views.generic import UpdateView
from .models import Post
from django.urls import reverse_lazy

class PostUpdateView(UpdateView):
    model = Post
    template_name = 'post_form.html'
    fields = ['title', 'content']
    success_url = reverse_lazy('post_list')


## 2.5 DeleteView

# Used to delete an object.

from django.views.generic import DeleteView
from .models import Post
from django.urls import reverse_lazy

class PostDeleteView(DeleteView):
    model = Post
    template_name = 'post_confirm_delete.html'
    success_url = reverse_lazy('post_list')


