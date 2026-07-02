from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True)

    class Meta:
        verbose_name_plural = "categories"

    def __str__(self):
        return self.name

class ProductQuerySet(models.QuerySet):
    """Custom queryset methods = reusable, readable filters.
    Instead of writing Product.objects.filter(stock__gt=0) everywhere,
    you write Product.objects.in_stock() everywhere."""

    def in_stock(self):
        return self.filter(stock__gt=0)

    def by_category(self, category_slug):
        return self.filter(category__slug=category_slug)


class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    category = models.ForeignKey(Category, on_delete=models.CASCADE,
    related_name="products")
    image = models.ImageField(upload_to="products/", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = ProductQuerySet.as_manager()

    def __str__(self):
        return self.name
    @property

    def is_available(self):
        return self.stock > 0