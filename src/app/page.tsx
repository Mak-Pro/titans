import { Spacer, Register, AvatarUploader } from "@/components";
export default async function RegisterPage() {
  return (
    <>
      <Spacer space={40} />
      <h2 className="text-center" style={{ textAlign: "center" }}>
        Welcome Aboard
      </h2>
      <Spacer space={8} />
      <p style={{ textAlign: "center" }}>Enter your nickname and enjoy</p>
      <Spacer space={20} />
      {/* <Register /> */}
      <AvatarUploader />
    </>
  );
}
