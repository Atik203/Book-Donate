import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSignupMutation } from "../../redux/features/user/userApi";

type FormData = {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirm_password: string;
};

const SignUp = () => {
  const navigate = useNavigate();
  const [Signup] = useSignupMutation();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (data.password !== data.confirm_password) {
      toast.error("Password does not match");
      return;
    }

    const userData = {
      username: data.username,
      email: data.email,
      phone: data.phone,
      address: data.address,
      password: data.password,
      first_name: data.first_name,
      last_name: data.last_name,
      confirm_password: data.confirm_password,
    };

    const toastId = toast.loading("Signing up...");
    try {
      const result = await Signup(userData).unwrap();

      if (!result.success) {
        toast.error("Failed to signup", { id: toastId });
        return;
      }

      toast.success("Sign up successful, check your email to verify", {
        id: toastId,
      });
      navigate("/login");
    } catch (error) {
      toast.error("Sign up failed", { id: toastId });
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="min-h-screen mt-10">
      <Helmet>
        <title>Sign up</title>
      </Helmet>
      <div className="flex flex-1">
        <div className="flex flex-1 flex-col justify-center px-2">
          <div className="mx-auto w-full max-w-4xl">
            <div className="text-center">
              <h2 className="mt-4 text-3xl font-bold leading-9 tracking-tight text-gray-900">
                Sign up
              </h2>
            </div>
            <div className="mt-8 w-full">
              <div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="flex items-center justify-center gap-4 w-full">
                    <div className="min-w-[24rem] w-full">
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        User Name
                      </label>
                      <div className="mt-2">
                        <input
                          id="username"
                          type="text"
                          autoComplete="username"
                          required
                          {...register("username")}
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="min-w-[24rem] w-full">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          type="email"
                          autoComplete="email"
                          required
                          {...register("email")}
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4">
                    <div className="min-w-[24rem] w-full">
                      <label
                        htmlFor="first_name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        First Name
                      </label>
                      <div className="mt-2">
                        <input
                          id="first_name"
                          type="text"
                          autoComplete="given-name"
                          required
                          {...register("first_name")}
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="min-w-[24rem] w-full">
                      <label
                        htmlFor="last_name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Last Name
                      </label>
                      <div className="mt-2">
                        <input
                          id="last_name"
                          type="text"
                          autoComplete="family-name"
                          required
                          {...register("last_name")}
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4">
                    <div className="min-w-[24rem] w-full">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Address
                      </label>
                      <div className="mt-2">
                        <input
                          id="address"
                          type="text"
                          autoComplete="address"
                          required
                          {...register("address")}
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="min-w-[24rem] w-full">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone Number
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          type="text"
                          autoComplete="phone"
                          required
                          {...register("phone")}
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <div className="min-w-[24rem] w-full">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Password
                      </label>
                      <div className="mt-2 relative">
                        <input
                          id="password"
                          type={isVisible ? "text" : "password"}
                          required
                          {...register("password")}
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <button
                          type="button"
                          onClick={toggleVisibility}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                        >
                          {isVisible ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>
                    <div className="min-w-[24rem] w-full">
                      <label
                        htmlFor="confirm_password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Confirm Password
                      </label>
                      <div className="mt-2 relative">
                        <input
                          id="confirm_password"
                          type={isVisible ? "text" : "password"}
                          required
                          {...register("confirm_password")}
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <button
                          type="button"
                          onClick={toggleVisibility}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                        >
                          {isVisible ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      type="submit"
                      className={`flex  min-w-[24rem] mx-auto justify-center rounded-md bg-navPrimary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                    >
                      Sign up
                    </button>
                  </div>
                  <p className="mt-2 leading-6 text-center text-gray-500">
                    Already a member?{" "}
                    <Link
                      to={"/login"}
                      className="font-semibold text-blue-500 hover:text-red-500"
                    >
                      Login
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
