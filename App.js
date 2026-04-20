import { useState } from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import TextSplash from "./src/components/TextSplash";
import { CartProvider } from "./src/context/CartContext";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <CartProvider>
      <AppNavigator />

      {showSplash && (
        <TextSplash
          text="Nguyễn Đình Lộc-23810310244"
          duration={2000}
          onFinish={() => setShowSplash(false)}
        />
      )}
    </CartProvider>
  );
}
