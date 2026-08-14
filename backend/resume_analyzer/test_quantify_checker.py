--- a/backend/resume_analyzer/test_quantify_checker.py
@@ -10,6 +10,8 @@
 def test_quantify_skills():
     """
     Test the quantify_skills function with various inputs.
+    Ensure that the function correctly handles different types of skills input.
     """
     # Test with a simple list of skills
     skills = ["Python", "JavaScript", "SQL"]
@@ -20,6 +22,10 @@
         assert result == {"Python": 5, "JavaScript": 4, "SQL": 3}
 
+    # Test with an empty list of skills
+    skills = []
+    result = quantify_skills(skills)
+    assert result == {}
 
     # Test with a list containing duplicate skills
     skills = ["Python", "Python", "JavaScript"]
