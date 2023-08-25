type Props = {
  pageHeading: string;
  pageSubHeading: string;
};

function Header({ pageHeading, pageSubHeading }: Props) {
  return (
    <header className="px-7">
      <h1 className="py-2 pb-0 text-3xl font-medium text-emerald-300">
        {pageHeading}
      </h1>
      <h2 className="pb-5 text-sm font-light text-yellow-300">
        {pageSubHeading}
      </h2>
    </header>
  );
}

export default Header;
