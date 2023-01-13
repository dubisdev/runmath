export const Settings = () => {
  return (
    <>
      <div className="settings">
        <h1>Settings</h1>
      </div>

      {/* a toggle  */}
      <label htmlFor="toggle">Toggle</label>
      <input type="checkbox" id="toggle" defaultValue={"true"} />

      {/* A color selector */}
      <label htmlFor="bg-color">Background Color</label>
      <input type="color" id="bg-color" defaultValue={"#000000"} />
    </>
  );
};
