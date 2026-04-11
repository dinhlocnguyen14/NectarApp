import { useState } from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import TextSplash from "./src/components/TextSplash";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <AppNavigator />

      {showSplash && (
        <TextSplash
          text="Nguyễn Đình Lộc-23810310244"
          duration={2000}
          onFinish={() => setShowSplash(false)}
        />
      )}
    </>
  );
}
