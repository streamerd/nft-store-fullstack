import { NextPage } from "next";


interface ButtonProps {
  href: string;
  value: string;
}

const Button: NextPage<ButtonProps> = ({
  href,
  value
}) => {
  return (
    <div id="button" className="fmbs-gallery__button-wrapper">
            <a className="fmbs-gallery__button" href={href}>
              {value}
            </a>
          </div>
  );
};

export default Button;
