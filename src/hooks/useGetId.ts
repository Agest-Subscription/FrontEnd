import { usePathname } from "next/navigation";

const useGetId = () => {
  const pathname = usePathname();

  // Split the pathname by '/' and extract the last segment (assuming the ID is the last segment)
  const segments = pathname.split("/");
  const id = segments[segments.length - 1];

  return id; // Convert to number or return null if not parsable
};

export default useGetId;
