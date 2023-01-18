import Link from 'next/link';

const Footer = () => {
  let currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="sticky_footer text-center p-4">
        <p>
          Copyright&nbsp;
          <Link href="/account">&copy;</Link>&nbsp;
          {currentYear} Gary Tietjen.
        </p>
      </footer>
    </>
  );
};

export default Footer;
