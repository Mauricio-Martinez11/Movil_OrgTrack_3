import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function TransportistaIndexRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/(main)/(transportista)/envios");
  }, []);

  return null;
}
