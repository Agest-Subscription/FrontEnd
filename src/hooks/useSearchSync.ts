import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useSearchSync = (resetPagination: () => void) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );

  const handleSearch = (value: string) => {
    const trimValue = value.trim();
    setSearchQuery(trimValue);
    if (value) {
      const params = new URLSearchParams(searchParams);
      params.set("search", trimValue);
      router.replace(`${pathname}?${params.toString()}`);
    } else {
      router.replace(pathname);
    }
    resetPagination(); // Reset pagination to page 1
  };

  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  return { searchQuery, handleSearch, setSearchQuery };
};

export default useSearchSync;
