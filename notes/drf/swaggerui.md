# DRF

[drf-spectacular documentation](https://drf-spectacular.readthedocs.io/en/latest/readme.html)

[swagger ui example petstore swagger](https://petstore.swagger.io/)

`pip install drf-spectacular`

```python
INSTALLED_APPS = [
    # ALL YOUR APPS
    'drf_spectacular',
]
```

```python
REST_FRAMEWORK = {
    # YOUR SETTINGS
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}
```

```python
SPECTACULAR_SETTINGS = {
    'TITLE': 'Your Project API',
    'DESCRIPTION': 'Your project description',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
    # OTHER SETTINGS
}
```
