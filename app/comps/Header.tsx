import Image from "next/image";

const Header = () => {
  return (
    <div>
      <div className="h-2xl flex flex-col justify-between p-3 gap-8">
        <Image src="/images/logo.png" height={20} width={20} alt={"logo"} />
        <p>🛒</p>
      </div>
    </div>
  );
};
export default Header;
