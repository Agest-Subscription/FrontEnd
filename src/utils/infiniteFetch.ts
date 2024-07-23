export const mergeAndMapInfiniteData = <T extends Record<string, any>>(
  initialSelectedData: T[] | undefined,
  valueKey: keyof T,
  labelKey: keyof T,
  pages: { data: { data: { id: string; display_name: string }[] } }[],
) => {
  // Map fetched permissions
  const mappedFetchedPermissions =
    pages.flatMap((page) =>
      page.data.data.map((permission) => ({
        value: permission.id,
        label: permission.display_name,
      })),
    ) ?? [];

  // Create a map for initial selected data to ensure they are included
  const initialMap = new Map(
    initialSelectedData?.map((data) => [
      data[valueKey] as string,
      {
        value: data[valueKey] as string,
        label: data[labelKey] as string,
      },
    ]),
  );

  // Add fetched data to the map, ensuring no duplicates
  mappedFetchedPermissions.forEach((fetchedData) => {
    initialMap.set(fetchedData.value, fetchedData);
  });

  return Array.from(initialMap.values());
};
