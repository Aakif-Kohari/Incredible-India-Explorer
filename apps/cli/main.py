--- a/apps/cli/main.py
@@ -1,6 +1,7 @@
 import sys
 from argparse import ArgumentParser
+from naga_architecture import NagaHouse
 
 def main():
     parser = ArgumentParser(description="Explore Naga Traditional Houses")
@@ -10,4 +11,5 @@ def main():
         help="The village to explore",
         choices=["VillageA", "VillageB"]
     )
+    parser.add_argument('--house', type=str, required=True, help='The house type')
 
     args = parser.parse_args()
 
@@ -15,4 +17,6 @@ def main():
         print("Exploring village:", args.village)
 
-    sys.exit(0)
+    house_type = args.house
+    naga_house = NagaHouse(house_type)
+    naga_house.explore()
+
+if __name__ == "__main__":
+    main()
