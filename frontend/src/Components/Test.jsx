import React from "react";
import { useForm } from "react-hook-form";

const SimpleForm = () => {
  // initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  // form submit handler
  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2>Simple React Hook Form</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: "12px" }}>
          <label>Name</label>
          <input
            type="text"
            {...register("name")}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Email</label>
          <input
            type="email"
            {...register("email")}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Message</label>
          <textarea
            {...register("message")}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default SimpleForm;