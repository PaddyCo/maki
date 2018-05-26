import { Key } from "ts-keycode-enum";

export interface IKey {
  type: "Key";
  code: Key;
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
}

export interface IAxis {
  type: "Axis";
  index: Axis;
  deviceIndex: number;
}

export interface IAxisAction extends IAxis {
  positive: boolean;
}

export default class InputHandler {
  private boundActions: [string, IKey | IButton | IAxisAction][]
  private gamepads: Gamepad[];
  private pressedKeys: Key[];
  private onKeyDownFunc: (e: KeyboardEvent) => void;
  private onKeyUpFunc: (e: KeyboardEvent) => void;


  public constructor() {
    this.boundActions = [];
    this.pressedKeys = [];
    this.onKeyDownFunc = this.onKeyDown.bind(this);
    this.onKeyUpFunc = this.onKeyUp.bind(this);

    window.addEventListener("keydown", this.onKeyDownFunc);
    window.addEventListener("keyup", this.onKeyUpFunc);


    window.addEventListener("gamepadconnected", (e: GamepadEvent) => {
      console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
        e.gamepad.index, e.gamepad.id,
        e.gamepad.buttons.length, e.gamepad.axes.length);

      this.gamepads = navigator.getGamepads();
    });

  }

  public bindKey(action: string, code: Key) {
    this.boundActions.push([action, { type: "Key", code }]);
  }

  public bindButton(action: string, button: Button, deviceIndex: number = 0) {
    this.boundActions.push([action, { type: "Button", index: button, deviceIndex }]);
  }

  public bindAxisAction(action: string, axis: Axis, positive: boolean, deviceIndex: number = 0) {
    this.boundActions.push([action, { type: "Axis", index: axis, deviceIndex, positive }]);
  }

  public isPressed(action: string): boolean {
    this.pollDevices();

    return this.boundActions.filter((a) => a[0] == action).some((a) => {
      const binding = a[1];
      switch (binding.type) {
        case "Key":
          return this.pressedKeys.find((k) => k === binding.code) !== undefined;
        case "Button":
          if (this.gamepads && this.gamepads[binding.deviceIndex]) {
            return this.gamepads[binding.deviceIndex].buttons[binding.index].pressed;
          } else {
            return false;
          }
        case "Axis":
          return false; // TODO
      }
    });
  }

  public destroy() {
    window.removeEventListener("keydown", this.onKeyDownFunc);
  }

  private onKeyDown(e: KeyboardEvent) {
    if (!this.pressedKeys.find((k) => k === e.keyCode)) {
      this.pressedKeys.push(e.keyCode);
    }
  }

  private onKeyUp(e: KeyboardEvent) {
    this.pressedKeys = this.pressedKeys.filter((k) => k !== e.keyCode);
  }


  private pollDevices() {
    if (this.gamepads && this.gamepads.length > 0 && this.gamepads[0].timestamp + 6 < performance.now()) {
      this.gamepads = navigator.getGamepads();
    }
  }
}

