export const Settings = () => {
  return (
    <>
      <div className="settings">
        <h1>Settings</h1>
      </div>

      {/* a toggle  */}
      <label htmlFor="run-start">Start RunMath on Windows Start</label>
      <input type="checkbox" id="run-start" defaultValue={"true"} />

      <br />
      {/* A color selector */}
      <label htmlFor="bg-color">Background Color</label>
      <input type="color" id="bg-color" defaultValue={"#000000"} />
    </>
  );
};
