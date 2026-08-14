diff --git a/apps/cli/main.py b/apps/cli/main.py
--- a/apps/cli/main.py
@@ -10,7 +10,7 @@
 from .commands import resume_analysis, user_management
 
 # Main entry point for the CLI application
-def main():
+def main_cli():
     parser = argparse.ArgumentParser(description='Mizo Traditional Houses: Explore Hillside Architecture')
     subparsers = parser.add_subparsers(dest='command')
 
@@ -23,10 +23,10 @@ def main():
         help='Analyze a resume and provide insights',
     )
     user_parser = subparsers.add_parser('user', help='Manage user accounts')
-    resume_parser.set_defaults(func=resume_analysis.main)
+    resume_parser.set_defaults(func=resume_analysis.resume_main)
 
     args = parser.parse_args()
-    args.func(args)
+    globals()[f'{args.command}_main'](args)
 
 
 if __name__ == '__main__':
