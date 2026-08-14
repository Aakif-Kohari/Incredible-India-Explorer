--- a/backend/analyzer/tests_scoring.py
@@ -10,7 +10,7 @@ import unittest

 class TestScoring(unittest.TestCase):
     def test_basic_score(self):
-        result = calculate_score(5)
+        result = calculate_score(10)
         self.assertEqual(result, 25)

     def test_zero_score(self):
