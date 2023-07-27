import Heading from "./Heading";
import Input from "./Input";
import Options from "./Options";
import Scrollers from "./Scrollers";

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
