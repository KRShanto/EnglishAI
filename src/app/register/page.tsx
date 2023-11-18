import Input from "@/components/Input";
import SubmitButton from "./SubmitButton";
import Link from "next/link";
import FormError from "@/components/FormError";

export default function Page() {
  return (
    <>
      <form className="form-style">
        <h1 className="title">Create Account</h1>

        <FormError />

        <Input name="name" label="Your Name" required />
        <Input name="email" label="Your Email Address" type="email" required />
        <Input name="country" label="Your Country" required />
        <Input name="password" label="Your Password" type="password" required />

        <div className="links">
          <Link href="#" className="link">
            Already have an account
          </Link>
        </div>

        <SubmitButton />
      </form>
    </>
  );
}
