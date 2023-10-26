import { useUserStore } from "@/store/userStore";
import { useForm, SubmitHandler } from "react-hook-form";

import SettingsGroup from "./settingsGroup";
import { toast } from "sonner";
import Avatar from "boring-avatars";
import { Alert, Button, Input } from "@typethings/ui";
import { User } from "lucide-react";

interface iUpdateUserInputs {
  username: string;
}

const Account = () => {
  const user = useUserStore((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iUpdateUserInputs>();

  const handleSaveUser: SubmitHandler<iUpdateUserInputs> = (data) => {
    useUserStore.setState({ user: data.username });
    toast.success("User saved");
  };

  return (
    <>
      <SettingsGroup title="Local User" icon={<User size={14} />}>
        <form
          onSubmit={handleSubmit(handleSaveUser)}
          className="flex flex-col space-y-2"
        >
          <label htmlFor="username" className="text-sm">Username:</label>
          <div className="flex items-center space-x-2">
            <div className="relative w-full">
              <Input
                id="username"
                placeholder="e.g. pheralb"
                defaultValue={user}
                className="px-9"
                {...register("username", {
                  maxLength: {
                    value: 15,
                    message: "Username must be less than 20 characters.",
                  },
                  required: {
                    value: true,
                    message: "Please enter a username.",
                  },
                })}
              />
              <div className="absolute left-0 top-0 ml-2 flex h-full items-center pr-3 text-neutral-300">
                <Avatar size={22} variant="marble" name={user} />
              </div>
            </div>
            <Button type="submit" variant="outline" disabled={!user}>
              Save
            </Button>
          </div>
          {errors.username && (
            <Alert>
              <p>{errors.username.message}</p>
            </Alert>
          )}
        </form>
      </SettingsGroup>
    </>
  );
};

export default Account;
