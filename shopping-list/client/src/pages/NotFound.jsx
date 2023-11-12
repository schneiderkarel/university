const NotFound = () => {
  const path = window.location.pathname;

  return (
    <div className="basic-component">
      {`"${path}" PAGE NOT FOUND 👀`}
    </div>
  );
};

export default NotFound;
