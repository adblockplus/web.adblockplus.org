import { createSignal } from "solid-js";
import { customElement } from "solid-element";

function Button({ children, ...props }) {
  return <button {...props}>{children}</button>;
};

const style = `div * {
          font-size: 200%;
        }

        span {
          width: 4rem;
          display: inline-block;
          text-align: center;
        }

        button {
          width: 4rem;
          height: 4rem;
          border: none;
          border-radius: 10px;
          background-color: seagreen;
          color: white;
        }`;

customElement("my-counter", () => {
  const [count, setCount] = createSignal(0);
  return (
    <div>
      <style>{style}</style>
      <Button onClick={() => setCount(count() - 1)}>-</Button>
      <span>{count}</span>
      <Button onClick={() => setCount(count() + 1)}>+</Button>
    </div>
  );
});