import { useConst } from "@chakra-ui/react";

function usePreferences() {
  const preferenceNamespace = useConst("preference:");

  function get(key: string) {
    return localStorage.getItem(`${preferenceNamespace}${key}`);
  }

  function set(key: string, value: string) {
    localStorage.setItem(`${preferenceNamespace}${key}`, value);
  }

  return { set, get };
}

export default usePreferences;
