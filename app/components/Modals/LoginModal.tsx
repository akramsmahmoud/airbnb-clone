"use client";

import { FC } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { useRouter } from "next/navigation";
import useRegisterModal from "@/app/hooks/useRegisterModal";
interface RegisterModalProps {}

const LoginModal: FC<RegisterModalProps> = ({}) => {
  const router = useRouter();

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
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    (data) => {
      setIsLoading(true);

      signIn("credentials", {
        ...data,
        redirect: false,
      }).then((callback) => {
        setIsLoading(false);

        if (callback?.ok) {
          toast.success("Login Successful");
          router.refresh();
          loginModal.close();
        }

        if (callback?.error) {
          toast.error(callback.error);
        }
      });
    },
    [loginModal, router]
  );

  const toggleModal = useCallback(() => {
    loginModal.close();
    registerModal.open();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome Back" subtitle="Login to your account" center />
      <Input
        id="email"
        label="Email"
        type="email"
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
          <div>First time using Airbnb?</div>
          <div
            className="text-neutral-800 cursor-pointer hover:underline"
            onClick={toggleModal}
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      onClose={loginModal.close}
      disabled={isLoading}
      title="Login"
      actionLabel="continue"
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
