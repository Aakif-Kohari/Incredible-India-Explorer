--- a/backend/manage.py
@@ -10,6 +10,7 @@
 import os
 import sys
 
+from django.core.management.base import BaseCommand
 
 def main():
     """Run administrative tasks."""
@@ -20,6 +21,8 @@ def main():
         "DJANGO_SETTINGS_MODULE", "myproject.settings"
     )
 
+    class Command(BaseCommand):
+        help = 'My custom command'
+
+        def handle(self, *args, **kwargs):
+            self.stdout.write(self.style.SUCCESS('Successfully ran command'))
 
     try:
         execute_from_command_line(sys.argv)
