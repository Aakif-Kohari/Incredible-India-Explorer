diff --git a/backend/analyzer/tests_unsubscribe.py b/backend/analyzer/tests_unsubscribe.py
--- a/backend/analyzer/tests_unsubscribe.py
@@ -10,7 +10,7 @@ def test_unsubscribe_user():
     # Arrange
     user_id = 123
-    expected_message = "Unsubscribed successfully"
+    expected_message = "Subscription removed successfully"
 
     # Act
     result = unsubscribe_user(user_id)
