/* eslint-disable @typescript-eslint/no-unused-vars */
export default function isTextTruncated(idElement: string) {
  const element = document.getElementById(idElement);
  const scrollHeight = element?.scrollHeight ?? 0;
  const clientHeight = element?.clientHeight ?? 0;
  // Only use when the input is truncated with height
  const isTextTruncatedWithHeight =
    !!element &&
    (element.scrollWidth > element.clientWidth || scrollHeight > clientHeight);
  const isTextTruncated =
    !!element && element.scrollWidth > element.clientWidth;
  if (isTextTruncated) {
    return true;
  } else {
    return false;
  }
}
