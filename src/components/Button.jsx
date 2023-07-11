import createClasses from "../utils/createClasses";

function Button({ text, primary, width = null, onClick, className = "" }) {
  let defaultProperty = "rounded-xl px-5 py-2 " + className;
  if (width) defaultProperty += `${width}`;
  const primaryProperty =
    "text-white bg-gray-800 hover:bg-gray-700 ease-in-out duration-300";
  const secondaryProperty =
    "text-gray-900 bg-white border border-black hover:bg-gray-800 hover:text-white ease-out duration-300 ";
  const btnProperty = createClasses(
    defaultProperty,
    primary ? primaryProperty : secondaryProperty
  );
  const clickHandler = (e) => {
    onClick();
  };

  return (
    <div>
      {/* <button className={btnProperty} onClick={clickHandler}> */}
      <button className={btnProperty} onClick={clickHandler}>
        {text}
      </button>
    </div>
  );
}

export default Button;
