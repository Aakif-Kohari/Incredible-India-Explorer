--- a/backend/resume_analyzer/test_quantify_checker.py
@@ -1,5 +1,3 @@
-# This is a test file for the resume analyzer backend.
-
 import unittest
 from backend.resume_analyzer.quantify_checker import QuantifyChecker
 
@@ -20,7 +18,7 @@ class TestQuantifyChecker(unittest.TestCase):
         self.assertEqual(result['experience'], 2)
 
     def test_quantify_education(self):
-        checker = QuantifyChecker()
+        checker = QuantifyChecker(data=self.resume_data)
         result = checker.quantify('education')
         self.assertEqual(result['degree'], 'BSc')
         self.assertEqual(result['year'], 2020)
@@ -31,7 +29,7 @@ class TestQuantifyChecker(unittest.TestCase):
 
     def test_quantify_skills(self):
-        checker = QuantifyChecker()
+        checker = QuantifyChecker(data=self.resume_data)
         result = checker.quantify('skills')
         self.assertIn('Python', result['languages'])
         self.assertIn('Django', result['frameworks'])
