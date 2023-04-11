"use client";

import { FC } from "react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";

interface RegisterModalProps {}

const RegisterModal: FC<RegisterModalProps> = ({}) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const toggleModal = useCallback(() => {
    loginModal.open();
    registerModal.close();
  }, [loginModal, registerModal]);

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    (data) => {
      setIsLoading(true);
      axios
        .post("/api/register", data)
        .then(() => {
          setIsLoading(false);
          loginModal.open();
          registerModal.close();
          toast.success("Account created successfully");
        })
        .catch((err) => {
          toast.error("Something went wrong. Please try again later.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [loginModal, registerModal]
  );

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account" center />
      <Input
        id="email"
        label="Email"
        type="email"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        label="Continue with Google"
        icon={FcGoogle}
        outline
        onClick={() => signIn("google")}
      />
      <Button
        label="Continue with Github"
        icon={AiFillGithub}
        outline
        onClick={() => signIn("github")}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex justify-center flex-row items-center gap-2">
          <div>Already Have Account?</div>
          <div
            onClick={toggleModal}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={registerModal.isOpen}
      onClose={registerModal.close}
      disabled={isLoading}
      title="Register"
      actionLabel="continue"
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
