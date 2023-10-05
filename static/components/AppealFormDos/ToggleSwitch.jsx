export default function ToggleSwitch(props) {
  return (
    <div class="toggle-wrap" onClick={(e) => e.stopPropagation()}>
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
