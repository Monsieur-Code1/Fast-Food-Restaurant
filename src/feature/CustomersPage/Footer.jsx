import {
  FiFacebook,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiPhone,
  FiYoutube,
} from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="mx-auto font-Inter  flex w-[100%] flex-wrap justify-start laptop:justify-around text-[15px] text-[#FDF8F8]">
      <Faene />
      <Contact />
      <Time />
    </footer>
  );
}

function Faene() {
  return (
    <div className="mt-4 w-[420px] px-1">
      <h3 className="text-[30px]">Faene</h3>
      <p>
        Necessary, making this the first true generator on the Internet. It uses
        a dictionary of over 200 Latin words, combined with
      </p>
      <div className="mt-2 flex items-start justify-start gap-3 bg-[#] text-xl">
        <span className="rounded-full bg-[#BF9742] p-1 text-[#000000]">
          <FiFacebook />
        </span>
        <span className="rounded-full bg-[#BF9742] p-1 text-[#000000]">
          <FiYoutube />
        </span>
        <span className="rounded-full bg-[#BF9742] p-1 text-[#000000]">
          <FiInstagram />
        </span>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="mt-4 w-[350px] px-1">
      <div className="flex justify-start gap-1">
        <FiMapPin className="fill-[#BF9742] text-lg text-[#000000]" />

        <p>6 October-second district</p>
      </div>
      <div className="flex justify-start gap-1">
        <FiPhone className="fill-[#BF9742] text-lg text-[#000000]" />
        <p> +201010101010</p>
      </div>
      <div className="flex justify-start gap-1">
        <FiMail className="fill-[#BF9742] text-lg text-[#000000]" />

        <p>Faene@gmail.com</p>
      </div>
    </div>
  );
}

function Time() {
  return (
    <div className="mt-4 w-[250px] px-1">
      <p>Opening Hours</p>
      <p>Everyday</p>
      <p>10.00 Am -10.00 Pm</p>
    </div>
  );
}
