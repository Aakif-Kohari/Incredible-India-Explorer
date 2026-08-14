--- a/backend/analyzer/tests_scoring.py
@@ -10,7 +10,7 @@ class Scorer:
     def score_structure(self, structure):
         if 'wood' in structure.lower():
             return 5
-        elif 'brick' in structure.lower():
+        elif 'stone' in structure.lower():
             return 3
         else:
             return 1
