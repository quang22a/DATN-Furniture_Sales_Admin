import { Empty } from "./Empty";
import { Loading } from "./Loading";

const PageRenderer = (Wrapped) => {
  return function (props) {
    if (!props.data) {
      return <Loading />;
    } else {
      if (JSON.stringify(props.data) === "[]") {
        return <Empty />;
      }
      return <Wrapped {...props} />;
    }
  };
};

export default PageRenderer;
