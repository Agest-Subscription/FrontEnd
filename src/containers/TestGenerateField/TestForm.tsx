import { FC } from "react";

import { useGetModalComponents } from "./useGenerateComponents";

import { GridLayout } from "@/components/GridLayout/GridLayout";

const AddTestForm: FC = () => {
  const components = useGetModalComponents();

  return (
    <GridLayout
      schema={{
        defaultItemGutter: [40, 40],
        gridItems: [
          {
            screenBreakpoints: {
              xl: 24,
            },
            gridItems: [components.FirstName],
          },
          {
            screenBreakpoints: {
              xl: 24,
            },
            gridItems: [components.LastName, components.AddressStreet],
          },
        ],
      }}
    />
  );
};

export default AddTestForm;
