import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUpdateProfileMutation } from "../../redux/features/user/userApi";
import { setUser } from "../../redux/features/user/userSLice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { TUser } from "../../types/userSateData";
import uploadImageToImgBB from "../../utils/uploadImageToImgBB";
import { EditIcon } from "../ui/EditIcon";

export default function EditProfileModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const currentUser = useAppSelector((state: RootState) => state.user.user);
  const token = useAppSelector((state: RootState) => state.user.token);
  const dispatch = useAppDispatch();

  const [updateProfile] = useUpdateProfileMutation();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: currentUser?.username || "",
      email: currentUser?.email || "",
      firstName: currentUser?.first_name || "",
      lastName: currentUser?.last_name || "",
      phone: currentUser?.phone || "",
      address: currentUser?.address || "",
      image: currentUser?.image || "",
    },
  });
  console.log(currentUser);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let imageUrl = currentUser?.image;

    // Check if the image field has a file selected
    if (data.image && data.image.length > 0) {
      imageUrl = await uploadImageToImgBB(data.image[0]);
      if (!imageUrl) return toast.error("Failed to upload image");
    }

    const userData = {
      id: currentUser?.id,
      phone: data.phone,
      address: data.address,
      user: {
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        username: data.username,
        image: imageUrl,
      },
    };

    try {
      const result = await updateProfile(userData).unwrap();
      if (result.success) {
        toast.success("Profile updated successfully");
        const setUserData: TUser = {
          username: data.username,
          email: data.email,
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone,
          address: data.address,
          image: imageUrl,
          role: currentUser?.role as "User" | "Admin",
          id: currentUser?.id as number,
          reward_point: currentUser?.reward_point as number,
          claimed_books: currentUser?.claimed_books as TUser["claimed_books"],
        };

        if (!token) return toast.error("Token not found");
        dispatch(setUser({ user: setUserData, token }));
        onOpenChange();
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        color="danger"
        style={{
          textAlign: "center",
        }}
      >
        <EditIcon />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                Edit Profile
              </ModalHeader>
              <ModalBody>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    color: "black",
                  }}
                >
                  <div className="flex flex-col text-semibold gap-2">
                    <label htmlFor="username">Username</label>
                    <input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      {...register("username")}
                      style={{
                        padding: "0.5rem",
                        borderRadius: "0.25rem",
                        border: "1px solid #ccc",
                        width: "100%",
                      }}
                    />
                  </div>
                  <div className="flex flex-col text-semibold gap-2">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      {...register("email")}
                      style={{
                        padding: "0.5rem",
                        borderRadius: "0.25rem",
                        border: "1px solid #ccc",
                        width: "100%",
                      }}
                    />
                  </div>
                  <div className="flex flex-col text-semibold gap-2">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="Enter your first name"
                      {...register("firstName")}
                      style={{
                        padding: "0.5rem",
                        borderRadius: "0.25rem",
                        border: "1px solid #ccc",
                        width: "100%",
                      }}
                    />
                  </div>
                  <div className="flex flex-col text-semibold gap-2">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Enter your last name"
                      {...register("lastName")}
                      style={{
                        padding: "0.5rem",
                        borderRadius: "0.25rem",
                        border: "1px solid #ccc",
                        width: "100%",
                      }}
                    />
                  </div>
                  <div className="flex flex-col text-semibold gap-2">
                    <label htmlFor="phone">Phone</label>
                    <input
                      id="phone"
                      type="text"
                      placeholder="Enter your phone number"
                      {...register("phone")}
                      style={{
                        padding: "0.5rem",
                        borderRadius: "0.25rem",
                        border: "1px solid #ccc",
                        width: "100%",
                      }}
                    />
                  </div>
                  <div className="flex flex-col text-semibold gap-2">
                    <label htmlFor="address">Address</label>
                    <input
                      id="address"
                      type="text"
                      placeholder="Enter your address"
                      {...register("address")}
                      style={{
                        padding: "0.5rem",
                        borderRadius: "0.25rem",
                        border: "1px solid #ccc",
                        width: "100%",
                      }}
                    />
                  </div>
                  <div className="flex flex-col text-semibold gap-2">
                    <label htmlFor="image">Image</label>
                    <input
                      id="image"
                      type="file"
                      {...register("image")}
                      style={{
                        padding: "0.5rem",
                        borderRadius: "0.25rem",
                        border: "1px solid #ccc",
                        width: "100%",
                      }}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Submit
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
