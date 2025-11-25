import { useRouter } from "expo-router";
import { useEffect } from "react";
import { getRole } from '../../utils/auth';

export default function TransportistaIndexRedirect() {
  const router = useRouter();

  // NOTE: This redirect logic is temporary. We protect the transportista
  // landing by checking the locally stored role and sending non-transportista
  // users back to the client index. In a full implementation, role/permission
  // checks should be performed and enforced by the backend and the app should
  // rely on a centralized auth state (token) rather than local role flags.
  useEffect(() => {
    let mounted = true;
    (async () => {
      const role = await getRole();
      if (!mounted) return;
      if (role === 'transportista') {
        router.replace('/(main)/(transportista)/envios');
      } else {
        // if not transportista, send to cliente
        router.replace('/(main)/(cliente)');
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return null;
}
