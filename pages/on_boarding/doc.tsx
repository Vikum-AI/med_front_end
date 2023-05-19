import SessionReact from "supertokens-auth-react/recipe/session";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { TextInput, Checkbox, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";

const ProtectedPage = () => {
  const session: any = useSessionContext();

  const form = useForm({
    initialValues: {
      name: "",
      registrationNumber: "",
      educationalQualifications: "",
      termsOfService: false,
    },

    validate: {
      //   email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const onSubmit = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/on_boarding/data/`
    );
  };

  return (
    <Box mx="10rem" mt="4rem">
      <form
        className="flex flex-col space-y-4"
        onSubmit={form.onSubmit((values) => console.log(values))}
      >
        <TextInput
          withAsterisk
          label="Name"
          placeholder="First Last"
          {...form.getInputProps("name")}
        />
        <TextInput
          withAsterisk
          label="Registration Number"
          placeholder="NXXXXXXX"
          {...form.getInputProps("registrationNumber")}
        />
        <TextInput
          withAsterisk
          label="Educational Qualifications"
          placeholder="BSc, MSc..."
          {...form.getInputProps("educationalQualifications")}
        />

        <div className="flex justify-end">
          <button
            className="bg-blue-500 px-4 py-2 rounded-lg text-white"
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </Box>
  );
};

export default function Doc(props) {
  return (
    <SessionReact.SessionAuth>
      <ProtectedPage />
    </SessionReact.SessionAuth>
  );
}
