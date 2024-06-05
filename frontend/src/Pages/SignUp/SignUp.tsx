import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axiosPublic from "../../axios/axiosPublic";
type FormData = {
  username: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirm_password: string;
};

const SignUp = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => {
    const first_name = data.fullName.split(" ")[0];
    const last_name = data.fullName.split(" ")[1];

    const userData = {
      username: data.username,
      email: data.email,
      phone: data.phone,
      address: data.address,
      password: data.password,
      first_name: first_name,
      last_name: last_name,
      confirm_password: data.confirm_password,
    };

    axiosPublic
      .post("/patient/register/", userData)
      .then((res) => {
        if (res.data.success) {
          toast("Check your email to verify your account");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div className="min-h-screen my-12">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1 className="text-center font-bold text-2xl md:text-4xl">Sign Up</h1>
      <form
        onSubmit={onSubmit}
        className="max-w-sm mt-12 md:max-w-xl mx-auto space-y-10"
      >
        <Input
          label="User Name"
          className="font-bold"
          radius="full"
          isRequired
          isClearable
          maxLength={20}
          classNames={{
            label: "ml-2 no-asterisk",
            errorMessage: "text-red-500 text-sm px-3",
            input: "bg-white",
            inputWrapper: "bg-white",
          }}
          variant="bordered"
          size="lg"
          labelPlacement="outside"
          {...register("username", { required: true })}
          placeholder="Enter your user name"
        />

        <Input
          label="Full Name"
          className="font-bold my-2"
          radius="full"
          isClearable
          isRequired
          variant="bordered"
          size="lg"
          maxLength={100}
          labelPlacement="outside"
          {...register("fullName", { required: true })}
          placeholder="Enter your full name"
          classNames={{
            label: "ml-2 no-asterisk",
            errorMessage: "text-red-500 text-sm px-3",
            input: "bg-white",
            inputWrapper: "bg-white",
          }}
        />
        <Input
          label="Email"
          className="font-bold my-2"
          radius="full"
          isClearable
          isRequired
          variant="bordered"
          size="lg"
          type="email"
          maxLength={100}
          labelPlacement="outside"
          {...register("email", { required: true })}
          placeholder="Enter your email address"
          classNames={{
            label: "ml-2 no-asterisk",
            errorMessage: "text-red-500 text-sm px-3",
            input: "bg-white",
            inputWrapper: "bg-white",
          }}
        />
        <Input
          label="Phone"
          className="font-bold my-2 rounded-[136px]"
          radius="full"
          isClearable
          isRequired
          variant="bordered"
          size="lg"
          type="tel"
          maxLength={11}
          minLength={11}
          labelPlacement="outside"
          {...register("phone", {
            required: true,
          })}
          placeholder="Enter your phone number"
          classNames={{
            label: "ml-2 no-asterisk",
            errorMessage: "text-red-500 text-sm px-3",
            input: "bg-white",
            inputWrapper: "bg-white",
          }}
        />
        <Input
          label="Address"
          className="font-bold my-2 rounded-[136px]"
          radius="full"
          isClearable
          isRequired
          variant="bordered"
          size="lg"
          labelPlacement="outside"
          {...register("address", {
            required: true,
          })}
          placeholder="Enter your Address"
          classNames={{
            label: "ml-2 no-asterisk",
            errorMessage: "text-red-500 text-sm px-3",
            input: "bg-white",
            inputWrapper: "bg-white",
          }}
        />
        <Input
          label="Password"
          className="font-bold my-2 rounded-[136px]"
          radius="full"
          variant="bordered"
          size="lg"
          isRequired
          labelPlacement="outside"
          {...register("password", {
            required: true,
          })}
          placeholder="Enter your password"
          classNames={{
            label: "ml-2 no-asterisk",
            errorMessage: "text-red-500 text-sm px-3",
            input: "bg-white",
            inputWrapper: "bg-white",
          }}
          endContent={
            <button
              className=""
              type="button"
              onClick={() => {
                setIsVisible(!isVisible);
              }}
            >
              {isVisible ? (
                <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <FaEye className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          label="Confirm Password"
          className="font-bold my-2 rounded-[136px]"
          radius="full"
          variant="bordered"
          size="lg"
          isRequired
          labelPlacement="outside"
          {...register("confirm_password", {
            required: true,
          })}
          placeholder="Confirm your password"
          classNames={{
            label: "ml-2 no-asterisk",
            errorMessage: "text-red-500 text-sm px-3",
            input: "bg-white",
            inputWrapper: "bg-white",
          }}
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button
          type="submit"
          isDisabled={
            password === "" ||
            confirmPassword === "" ||
            password !== confirmPassword
          }
          className="w-32 font-bold h-12 mx-auto bg-[#06ABA1] text-white rounded-full flex items-center hover:bg-gray-300 hover:text-black"
        >
          Sign Up
        </Button>
      </form>
      <div className="my-3 space-y-3">
        <p className="text-gray-800 text-center">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-navPrimary hover:underline hover:text-green-800"
          >
            Login
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
