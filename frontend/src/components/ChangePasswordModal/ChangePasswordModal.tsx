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
import { useChangePasswordMutation } from "../../redux/features/user/userApi";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { TChangePassword } from "../../types/userSateData";

export default function ChangePasswordModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const currentUser = useAppSelector((state: RootState) => state.user.user);

  const [changePassword] = useChangePasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // Handle form submission logic here

    if (data.newPassword !== data.confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    const submitData = {
      username: currentUser?.username,
      old_password: data.oldPassword,
      new_password: data.newPassword,
      confirm_password: data.confirmPassword,
    };
    const toastId = toast.loading("Changing password...");
    const result = await changePassword(submitData as TChangePassword).unwrap();

    if (result.success) {
      toast.success("Password changed successfully", { id: toastId });
    } else {
      toast.error("Failed to Change password", { id: toastId });
    }
    onOpenChange();
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
        Change Password
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
                Change Password
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
                    <label htmlFor="old-password">Old Password</label>
                    <input
                      id="old-password"
                      type="text"
                      placeholder="Enter your old password"
                      {...register("oldPassword", { required: true })}
                      style={{
                        padding: "0.5rem",
                        borderRadius: "0.25rem",
                        border: "1px solid #ccc",
                        width: "100%",
                      }}
                      autoFocus
                    />
                    {errors.oldPassword && <span>This field is required</span>}
                  </div>
                  <div className="flex flex-col text-semibold gap-2">
                    <label htmlFor="new-password">New Password</label>
                    <input
                      id="new-password"
                      type="password"
                      placeholder="Enter your new password"
                      {...register("newPassword", { required: true })}
                      style={{
                        padding: "0.5rem",
                        borderRadius: "0.25rem",
                        border: "1px solid #ccc",
                        width: "100%",
                      }}
                    />
                    {errors.newPassword && <span>This field is required</span>}
                  </div>
                  <div className="flex flex-col text-semibold gap-2">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                      id="confirm-password"
                      type="password"
                      placeholder="Enter your confirm password"
                      {...register("confirmPassword", { required: true })}
                      style={{
                        padding: "0.5rem",
                        borderRadius: "0.25rem",
                        border: "1px solid #ccc",
                        width: "100%",
                      }}
                    />
                    {errors.confirmPassword && (
                      <span>This field is required</span>
                    )}
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
