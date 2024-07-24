export const mergeAndMapInfiniteData = <T extends Record<string, any>>(
  initialSelectedData: T[] | T,
  valueKey: keyof T,
  labelKey: keyof T,
  pages: { data: { valueKey: string; labelKey: string }[] }[],
) => {
  // Map fetched permissions
  const mappedFetchedPermissions =
    pages.flatMap((page) =>
      page.data.map((data) => ({
        value: data.valueKey,
        label: data.labelKey,
      })),
    ) ?? [];
  let initialMap = new Map();
  // Create a map for initial selected data to ensure they are included
  if (Array.isArray(initialSelectedData)) {
    initialMap = new Map(
      initialSelectedData?.map((data) => [
        data[valueKey] as string,
        {
          value: data[valueKey] as string,
          label: data[labelKey] as string,
        },
      ]),
    );
  } else {
    initialMap.set(initialSelectedData[valueKey] as string, {
      value: initialSelectedData[valueKey] as string,
      label: initialSelectedData[labelKey] as string,
    });
  }

  // Add fetched data to the map, ensuring no duplicates
  mappedFetchedPermissions.forEach((fetchedData) => {
    initialMap.set(fetchedData.value, fetchedData);
  });

  const mergedArray = Array.from(initialMap.values());
  return mergedArray.map((i) => ({ value: i.value, label: i.label }));
};
