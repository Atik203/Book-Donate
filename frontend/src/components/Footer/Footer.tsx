import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="footer mt-20 p-8 md:p-10 lg:p-20 text-black"
      style={{
        backgroundImage: `url('/footerSvg.svg')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <aside>
        <h4 className="text-lg">Copyright © BookDonate. All Rights Reserved</h4>
        <p className="text-xl font-bold">Follow Us:</p>
        <div className="flex items-center justify-center gap-3 cursor-pointer">
          <FaFacebook className="text-2xl" />
          <FaLinkedin className="text-2xl" />
          <FaTwitter className="text-2xl" />
          <FaYoutube className="text-2xl" />
          <FaInstagram className="text-2xl" />
        </div>
      </aside>

      <nav>
        <h6 className="text-xl font-bold">Company</h6>
        <a className="link link-hover text-lg">About us</a>
        <a className="link link-hover text-lg">Contact</a>
        <a className="link link-hover text-lg">Jobs</a>
        <a className="link link-hover text-lg">Press kit</a>
      </nav>
      <nav>
        <h6 className="text-xl font-bold">Legal</h6>
        <a className="link link-hover text-lg">Terms of use</a>
        <a className="link link-hover text-lg">Privacy policy</a>
        <a className="link link-hover text-lg">Cookie policy</a>
      </nav>
    </footer>
  );
};

export default Footer;
