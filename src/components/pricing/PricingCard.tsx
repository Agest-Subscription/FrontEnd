// import React from "react";
// import { CheckCircleTwoTone } from "@ant-design/icons";
// import { Button, Flex, Typography } from "antd";

// import { PricingPlanLandingPageType } from "@/interfaces/PricingPlan";
// import { capitalize } from "@/utils/string";

// type Props = {
//   isPrimary?: boolean;
//   PricingPlan: PricingPlanLandingPageType;
// };

// const PricingCard = ({ PricingPlan, isPrimary = false }: Props) => {
//   const primaryStyles = {
//     backgroundColor: "white",
//     padding: "32px 16px",
//     borderRadius: "4px",
//     border: "1px solid #E9E9E9",
//     boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
//     color: "#424856",
//     marginBottom: "16px",
//     fontSize: "40px",
//     colorTitle: "#2F80ED",
//     colorText: "#424856",
//     buttonBackgroundColor: "#2F80ED",
//     buttonTextColor: "white",
//   };

//   const secondaryStyles = {
//     backgroundColor: "#F8F9FA",
//     padding: "24px 16px",
//     borderRadius: "0px 4px 4px 0px",
//     border: "none",
//     boxShadow: "",
//     color: "black",
//     marginBottom: "0px",
//     fontSize: "32px",
//     colorTitle: "black",
//     colorText: "black",
//     buttonBackgroundColor: "white",
//     buttonTextColor: "#2F80ED",
//   };

//   const styles = isPrimary ? primaryStyles : secondaryStyles;

//   return (
//     <Flex
//       vertical
//       style={{
//         backgroundColor: styles.backgroundColor,
//         width: "fit-content",
//         padding: styles.padding,
//         height: "fit-content",
//         borderRadius: styles.borderRadius,
//         border: styles.border,
//         boxShadow: styles.boxShadow,
//         marginBottom: styles.marginBottom,
//         color: styles.color,
//         maxWidth: "350px",
//       }}
//     >
//       <Typography
//         style={{
//           fontSize: styles.fontSize,
//           fontWeight: 700,
//           color: styles.colorTitle,
//         }}
//       >
//         {PricingPlan.pricing_name}
//       </Typography>
//       <Typography style={{ fontSize: 16, fontWeight: 400 }}>
//         {PricingPlan.pricing_desc}
//       </Typography>
//       <Typography style={{ fontSize: 40, fontWeight: 700 }}>
//         ${PricingPlan.fee}
//         <sup style={{ fontSize: 14, fontWeight: 400 }}>/month</sup>
//       </Typography>
//       {PricingPlan.features.map((feature) => (
//         <Flex gap={8} key={feature.feature_id}>
//           <CheckCircleTwoTone twoToneColor="#52c41a" />
//           <Typography style={{ fontSize: 16, fontWeight: 400 }}>
//             {capitalize(feature.name)}
//           </Typography>
//         </Flex>
//       ))}
//       <Button
//         style={{
//           backgroundColor: styles.buttonBackgroundColor,
//           color: styles.buttonTextColor,
//           marginTop: "5rem",
//           border: "1px solid #2F80ED",
//           padding: "24px 20px",
//           borderRadius: 4,
//         }}
//       >
//         Get Started
//       </Button>
//     </Flex>
//   );
// };

// export default PricingCard;
