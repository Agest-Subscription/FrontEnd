import * as yup from "yup";

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
      return value.basic != null || value.pro != null || value.premium != null;
    },
  );

const landingPageFormValuesSchema = yup.object().shape({
  landing_page_items: yup.array().of(itemSchema).nullable().default(undefined),
});

export default landingPageFormValuesSchema;
