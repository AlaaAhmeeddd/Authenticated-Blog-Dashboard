import { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  signupStart,
  signupSuccess,
  signupFailure,
} from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { addNewUser, queryClient } from "../../utils/http";
import { RootState } from "@/store";
import { UserType } from "@/type";

export default function useSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserType>({
    email: "",
    password: "",
    userName: "",
    location: "",
    age: "",
    confirmedPassword: "",
    imageUrl: "",
  });
  const [inputErrors, setInputErrors] = useState({
    email: "",
    password: "",
    userName: "",
    location: "",
    age: "",
    passwordConfirmed: "",
    imageUrl: "",
  });
  const dispatch = useDispatch();

  const { mutate } = useMutation({
    mutationFn: addNewUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleFormData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    let errors = { ...inputErrors };

    switch (name) {
      case "email":
        errors.email = value.trim() === "" ? "Email is required" : "";
        break;
      case "password":
        errors.password = value.trim() === "" ? "Password is required" : "";
        break;
      case "userName":
        errors.userName = value.trim() === "" ? "Username is required" : "";
        break;
      case "location":
        errors.location = value.trim() === "" ? "Location is required" : "";
        break;
      case "age":
        errors.age = Number(value) <= 0 ? "Age must be a positive number" : "";
        break;
      case "confirmedPassword":
        errors.passwordConfirmed =
          value.trim() === "" ? "Password is required" : "";
        errors.passwordConfirmed =
          value !== formData.password ? "Passwords do not match" : "";
        break;
      case "imageUrl":
        errors.imageUrl = value.trim() === "" ? "Image is required" : "";
        break;
      default:
        break;
    }

    setInputErrors(errors);

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    let errors = { ...inputErrors };
    if (formData.userName.trim() === "") {
      errors.userName = "Username is required";
    }
    if (formData.email.trim() === "") {
      errors.email = "Email is required";
    }
    if (formData.password.trim() === "") {
      errors.password = "Password is required";
    }
    if (formData.location.trim() === "") {
      errors.location = "Location is required";
    }
    if (formData.imageUrl.trim() === "") {
      errors.imageUrl = "Image is required";
    }
    if (Number(formData.age) < 16) {
      errors.age = "Age must be a equal or greater than 16";
    }
    if (formData.confirmedPassword !== formData.password) {
      errors.passwordConfirmed = "Passwords do not match";
    } else if (formData.confirmedPassword.trim() === "") {
      errors.passwordConfirmed = "Confirmed Password is required";
    }
    setInputErrors(errors);

    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }
    dispatch(signupStart());
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      dispatch(signupSuccess(userCredential.user));
      mutate(formData);
      navigate("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        dispatch(signupFailure(err.message));
      } else {
        dispatch(signupFailure("An unknown error occurred"));
      }
    }
  };

  return {
    formData,
    inputErrors,
    handleFormData,
    handleSubmit,
    loading,
    error,
  };
}
