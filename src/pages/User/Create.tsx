import UserForm from "@components/UserForm";

export default function CreateUser() {
  const onFinish = (value: userForm) => {
    console.log("Received values of form: ", value);
  };

  return (
    <>
      <h2 className="title">Create User</h2>
      <UserForm
        labelCol={2}
        wrapperCol={10}
        onFinish={onFinish}
        intitalData={{ remember: true }}
      />
    </>
  );
}
