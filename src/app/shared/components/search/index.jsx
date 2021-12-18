import { useForm } from "react-hook-form";

import { Input } from "../partials/Input";

export const Search = ({ setSearch, placeholder }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setSearch(data.search.trim());
  };

  return (
    <form className="form-search" onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="search"
        className="form-control"
        label=""
        placeholder={`Tìm kiếm ${placeholder} ...`}
        id="search"
        validate={register("search")}
        errors={errors.search}
        para={""}
      />
      <button type="submit" className="btn btn-outline btn-search">
        <i className="fa fa-search" aria-hidden="true"></i>
      </button>
    </form>
  );
};
