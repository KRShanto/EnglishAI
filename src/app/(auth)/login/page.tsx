import FormError from "@/components/FormError";
import SubmitButton from "./SubmitButton";
import Link from "next/link";
import Input from "@/components/Input";
import ForgotLink from "./ForgotLink";

export default function Page() {
  return (
    <>
      <form className="form-style">
        <h1 className="title">Login Account</h1>

        <FormError />

        <Input name="email" label="Your Email Address" type="email" required />
        <Input name="password" label="Your Password" type="password" required />

        <div className="links">
          <Link href="/register" className="link">
            Don&rsquo;t have an account
          </Link>

          <ForgotLink />
        </div>

        <SubmitButton />
      </form>
    </>
  );
}
