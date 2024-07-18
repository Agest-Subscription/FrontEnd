import { Spin } from "antd";
type Props = {
  userState: string;
};

const LoadingBtn = (props: Props) => {
  const { userState } = props;

  return <Spin spinning={userState ? true : false}></Spin>;
};

export default LoadingBtn;
