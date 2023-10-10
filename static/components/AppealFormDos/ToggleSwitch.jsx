// This is a farily generic component that could be used in a UI library
// TODO: The labels could be passed in as props
export default function ToggleSwitch(props) {
  return (
    <div class="toggle-wrap">
      <div class="toggle-main-txt">Monthly</div>
      <label class="switch">
        <input
          class="toggle-input"
          type="checkbox"
          value="frequency"
          onClick={props.onClick}
        />
        <span class="slider round" />
      </label>
      <div class="toggle-main-txt">Yearly</div>
    </div>
  );
}
