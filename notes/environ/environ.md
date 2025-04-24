# ENVIRON

`pip install django-environ`

```python
import environ

env = environ.Env()
environ.Env.read_env(BASE_DIR / '.env')

SECRET_KEY = env("SECRET_KEY")
```
