import { Key } from "ts-keycode-enum";

export interface IKey {
  type: "Key";
  code: Key;
  state: IBindState;
}

export enum Button {
  South,
  East,
  West,
  North,
  LeftBumper,
  RightBumper,
  LeftTrigger,
  RightTrigger,
  Select,
  Start,
  LeftStick,
  RightStick,
  Up,
  Down,
  Left,
  Right,
  Home,
}

export enum Axis {
  LeftHorizontal,
  LeftVertical,
  RightHorizontal,
  RightVertical,
}

export interface IButton {
  type: "Button";
  index: Button;
  deviceIndex: number;
  state: IBindState;
}

export interface IBindState {
  pressTimeStamp?: number;
  justPressed: boolean;
}

export interface IAxis {
  type: "Axis";
  index: Axis;
  deviceIndex: number;
  state: IBindState;
}

export interface IAxisAction extends IAxis {
  positive: boolean;
}

export interface IAction {
  bindings: Array<IKey | IButton | IAxis>;
}

export default class InputHandler {
  private updateCallback: () => void;
  private onKeyDownFunc: (e: KeyboardEvent) => void;
  private onKeyUpFunc: (e: KeyboardEvent) => void;

  private actions: { [name: string]: IAction };

  constructor(updateCallback: () => void) {
    this.updateCallback = updateCallback;
    this.actions = {};

    this.onKeyDownFunc = this.onKeyDown.bind(this);
    this.onKeyUpFunc = this.onKeyUp.bind(this);
    window.addEventListener("keydown", this.onKeyDownFunc);
    window.addEventListener("keyup", this.onKeyUpFunc);

    requestAnimationFrame(this.update.bind(this));
  }

  public destroy() {
    window.removeEventListener("keydown", this.onKeyDownFunc);
    window.removeEventListener("keyup", this.onKeyUpFunc);
  }

  public bindKey(action: string, code: Key) {
    this.bind(action, { type: "Key", code, state: { justPressed: false } });
  }

  public bindButton(action: string, index: Button, deviceIndex: number = 0) {
    this.bind(action, { type: "Button", index, deviceIndex,  state: { justPressed: false }});
  }

  public isPressed(action: string): boolean {
    const a = this.actions[action];

    return a && a.bindings.some((b) => b.state.pressTimeStamp ? true : false);
  }

  public justPressed(action: string): boolean {
    const a = this.actions[action];
    return a && a.bindings.some((b) => b.state.justPressed);
  }

  public held(action: string): number | false {
    const a = this.actions[action];
    let pressTimeStamps = a ? a.bindings.map(b => b.state.pressTimeStamp) : undefined;

    if (!pressTimeStamps) {
      return false;
    } else {
      const pressTimeStamp = pressTimeStamps.filter((t) => t).sort()[0];
      return pressTimeStamp ? Math.floor(performance.now() - pressTimeStamp) : false;
    }

  }

  private bind(action: string, bind: IKey | IButton | IAxis) {
    if (!this.actions[action]) {
      this.actions[action] = {
        bindings: [bind],
      };
    } else {
      this.actions[action].bindings.push(bind);
    }
  }

  private update() {
    this.updateButtonStates();

    this.updateCallback();

    Object.keys(this.actions).forEach((key) => {
      this.actions[key].bindings.forEach((_, i) => {
        this.actions[key].bindings[i].state.justPressed = false;
      });
    });

    requestAnimationFrame(this.update.bind(this));
  }

  private onKeyDown(e: KeyboardEvent) {
    Object.keys(this.actions).forEach((key) => {
      const bindIndex = this.actions[key].bindings.findIndex((b) => b.type === "Key" && b.code === e.keyCode);
      if (bindIndex > -1) {
        this.press(key, bindIndex)
      }
    });
  }

  private onKeyUp(e: KeyboardEvent) {
    Object.keys(this.actions).forEach((key) => {
      this.actions[key].bindings.forEach((bind, i) => {
        if (bind.state.pressTimeStamp && bind.type === "Key" && bind.code === e.keyCode) {
          this.actions[key].bindings[i].state.pressTimeStamp = undefined;
          this.actions[key].bindings[i].state.justPressed = false;
        }
      });
    });
  }

  private updateButtonStates() {
    const gamepads = navigator.getGamepads();

    if (!gamepads) { return; }

    Object.keys(this.actions).forEach((key) => {
      const action = this.actions[key];

      action.bindings.forEach((bind, i) => {
        if (bind.type == "Button") {
          const gamepad = gamepads[bind.deviceIndex];

          if (gamepad && gamepad.buttons[bind.index].pressed) {
            this.press(key, i);
          } else if (gamepad && !gamepad.buttons[bind.index].pressed) {
            this.actions[key].bindings[i].state.pressTimeStamp = undefined;
            this.actions[key].bindings[i].state.justPressed = false;
          }
        }
      });
    });
  }

  private press(action: string, bindIndex: number) {
    const a = this.actions[action];
    const b = a.bindings[bindIndex];

    if (a && b && !b.state.pressTimeStamp) {
      this.actions[action].bindings[bindIndex].state.pressTimeStamp = performance.now();
      this.actions[action].bindings[bindIndex].state.justPressed = true;
    }
  }
}
