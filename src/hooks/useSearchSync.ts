import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useSearchSync = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (value) {
      const params = new URLSearchParams(searchParams);
      params.set("search", value);
      router.replace(`${pathname}?${params.toString()}`);
    } else {
      router.replace(pathname);
    }
  };

  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  return { searchQuery, handleSearch };
};

export default useSearchSync;
