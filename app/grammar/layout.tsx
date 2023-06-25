import Heading from "@/components/gammar/Heading";
import Input from "@/components/gammar/Input";
import Options from "@/components/gammar/Options";
import Scrollers from "@/components/gammar/Scrollers";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grammar">
      <Heading />

      <div className="input-options">
        <Input />
        <Options />
        <Scrollers />
      </div>

      {children}
    </div>
  );
}
