import Link from "next/link";

import {
  FEATURES,
  FEE_OVERATE,
  FEES,
  PERMISSIONS,
  PRICING_PlANS,
  SUBSCRIPTIONS,
  USERS,
} from "@/constants/routes";

export const items = [
  {
    label: <Link href={PRICING_PlANS}>Pricing Plan</Link>,
    key: PRICING_PlANS,
  },
  {
    label: (
      <>
        <Link href={SUBSCRIPTIONS}>Subscriptions</Link>
      </>
    ),
    key: SUBSCRIPTIONS,
  },
  {
    label: (
      <>
        <Link href={FEES}>Fee</Link>
      </>
    ),
    key: FEES,
  },
  {
    label: (
      <>
        <Link href={FEE_OVERATE}>Fee Overate</Link>
      </>
    ),
    key: FEE_OVERATE,
  },
  {
    label: (
      <>
        <Link href={FEATURES}>Features</Link>
      </>
    ),
    key: FEATURES,
  },
  {
    label: (
      <>
        <Link href={PERMISSIONS}>Permissions</Link>
      </>
    ),
    key: PERMISSIONS,
  },
  {
    label: (
      <>
        <Link href={USERS}>Users</Link>
      </>
    ),
    key: USERS,
  },
];
