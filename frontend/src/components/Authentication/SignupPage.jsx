import { useForm } from "react-hook-form";
import { z } from "zod";
// eslint-disable-next-line no-unused-vars
import { zodResolver } from "@hookform/resolvers/zod";
import "./SignupPage.css";
import user from "../../assets/user.webp";
import { useState } from "react";
import { getUser, signup } from "../../services/userServices";
import { Navigate } from "react-router-dom";
const schema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name should be at least 3 characters." }),
    email: z.string().email({ message: "Please enter valid email." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string(),
    deliveryAdress: z
      .string()
      .min(12, { message: "Adress must be at least 12 characters." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  });
const SignupPage = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [formError, setFormError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  console.log(profilePic);

  const onSubmit = async (formData) => {
    try {
      await signup(formData, profilePic);

      window.location = "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setFormError(err.response.data.message);
      }
    }
  };

  if (getUser()) {
    return <Navigate to="/" />;
  }
  return (
    <section className="align_center form_page">
      <form
        className="authentication_form signup_form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>SignUp Form</h2>

        <div className="image_input_section">
          <div className="image_preview">
            <img
              src={profilePic ? URL.createObjectURL(profilePic) : user}
              id="file-ip-1-preview"
            />
          </div>
          <label htmlFor="file-ip-1" className="image_label">
            Upload Image
          </label>
          <input
            type="file"
            id="file-ip-1"
            className="image_input"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
        </div>

        {/* Form Inputs */}
        <div className="form_inputs signup_form_input">
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className="form_text_input"
              type="text"
              placeholder="Enter your name"
              {...register("name")}
            />
            {errors.name && (
              <em className="form_error">{errors.name.message}</em>
            )}
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="form_text_input"
              type="email"
              placeholder="Enter your email address"
              {...register("email")}
            />
            {errors.email && (
              <em className="form_error">{errors.email.message}</em>
            )}
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="form_text_input"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <em className="form_error">{errors.password.message}</em>
            )}
          </div>

          <div>
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              id="cpassword"
              className="form_text_input"
              type="password"
              placeholder="Enter confirm password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <em className="form_error">{errors.confirmPassword.message}</em>
            )}
          </div>

          <div className="signup_textares_section">
            <label htmlFor="address">Delivery Address</label>
            <textarea
              id="address"
              className="input_textarea"
              placeholder="Enter delivery address"
              {...register("deliveryAdress")}
            />
            {errors.deliveryAdress && (
              <em className="form_error">{errors.deliveryAdress.message}</em>
            )}
          </div>
        </div>
        {formError && <em className="form_error">{formError}</em>}
        <button className="button_submit form_submit" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default SignupPage;

// name - Name should be at least 3 characters.
// email - Please enter valid email
// password - Password must be at least 8 characters.
// confirmPassword - Confirm Password does not match Password
// deliveryAddress - Address must be at least 15 characters.
