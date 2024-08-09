import * as yup from "yup";

import {
  LandingPageFormValues,
  LandingPageItem,
} from "@/interfaces/model/landingPage.type";

const itemSchema = yup
  .object()
  .shape({
    period: yup.string().required("Period is required"),
    basic: yup.string().nullable().default(null),
    pro: yup.string().nullable().default(null),
    premium: yup.string().nullable().default(null),
  })
  .test(
    "at-least-one",
    "At least one of basic, pro, or premium must be selected",
    async function (value) {
      console.log(
        "arr2: ",
        value.basic != null || value.pro != null || value.premium != null,
      );

      return value.basic != null || value.pro != null || value.premium != null;
    },
  );

const landingPageFormValuesSchema = yup.object().shape({
  landing_page_items: yup.array().of(itemSchema).nullable().default(undefined),
});

export default landingPageFormValuesSchema;

// const landingPageFormValuesSchema: yup.ObjectSchema<LandingPageFormValues> =
//   yup.object({
//     landing_page_items: yup
//       .array<LandingPageItem>(
//         yup.object<LandingPageItem>().shape({
//           // isTransaction: yup.boolean().default(false),
//           period: yup.string().nullable().required("Period is required"),

//           basic: yup.string().nullable(),
//           pro: yup.string().nullable(),
//           premium: yup.string().nullable(),
//         }),
//       )
//       .test(
//         "at-least-one",
//         "At least one of basic, pro, or premium must be selected",
//         async function (value) {
//           //  const index = parseInt(this.path.split("[")[1].split("]")[0], 10);
//           console.log("this: ", this);
//           const arr = value?.some((item, i) => {
//             return item.basic !== "" || item.pro !== "" || item.premium !== "";
//           });
//           console.log("arr: ", arr);

//           return true;
//         },
//       ),
//   });

// export default landingPageFormValuesSchema;
