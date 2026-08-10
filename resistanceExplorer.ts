diff --git a/resistanceExplorer.ts b/resistanceExplorer.ts
--- a/resistanceExplorer.ts
@@ -1,0 +1,21 @@
+import * as React from 'react';
+import { View, Text } from 'react-native';
+
+const ResistanceExplorer: React.FC = () => {
+  return (
+    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
+      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Welcome to the Youth Resistance Explorer</Text>
+      <Text style={{ fontSize: 16, textAlign: 'center' }}>
+        Honoring Kanaklata Barua through interactive learning and exploration.
+      </Text>
+    </View>
+  );
+};
+
+export default ResistanceExplorer;
